/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const base45 = require("base45-js");
const pako = require('pako');
const jose = require('node-jose');
const cose = require('cose-js')
const cbor = require('cbor');
const moment = require('moment');

const VerifierPlugin = require('../verifier/verifier-plugin');
const VerificationResult = require('../utils/verification-result');
const RulesVerifier = require('../utils/rules-verifier');
const { getCache } = require('../utils/cache');
const { CRED_TYPE, ISSUER_ID } = require('../constants');

const CredKeys = {
    "IssuingCountry": 1,
    "Credential": -260,
    "IssuanceDate": 6,
    "ExpirationDate": 4,
}

/**
 * EU DCC credential verifier plugin
 */
class EuCredentialVerifier extends VerifierPlugin {
    constructor() {
        super();
        this.rulesVerifier = new RulesVerifier();
    }

    async decode(params) {
        if (!this._checkIsEuCredential(params.getCredential())) {
            return new VerificationResult(false, null, CRED_TYPE.DCC);
        }

        let credential;
        try {
            credential = await this._getCredential(params);
        } catch {
            return new VerificationResult(
                false, `Certificate's signature is not valid`, CRED_TYPE.DCC, credential
            );
        }

        return new VerificationResult(true, 'Credential Decoded', CRED_TYPE.DCC, credential);
    }

    async verify(credential, params) {
        const signatureValidResult = await this._isSignatureValid(
            credential, params
        );
        if (!signatureValidResult.success) {
            signatureValidResult.credential = credential.credential;
            return signatureValidResult;
        }

        const credValidResponse = await this._isCredentialValid(credential, params);
        credValidResponse.credential = credential.credential;

        return credValidResponse;
    }

    /**
     * Returns the name of the verifier plugin
     * @returns {string}
     */
    getName() {
        return 'eu-dcc-verifier';
    }

    /**
     * Checks if supplied credential is an EU DCC credential.
     * If false, this plugin will not attempt to verify the credential
     * @private
     * @param {any} cred 
     * @returns {boolean}
     */
    _checkIsEuCredential(cred) {
        return (
            (typeof cred === 'string' && cred.startsWith('HC1')) ||
            (typeof cred === 'object' && cred.proof && cred.proof.proofValue)
        );
    }

    /**
     * Decodes, inflates, and returns the credential
     * @private
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {Object} The credential
     */
    async _getCredential(params) {
        const cred = params.getCredential();
        if (typeof cred === 'object') {
            return cred;
        }
        const toDecode = cred.startsWith('HC1:')
            ? cred.substr(4) : cred.substr(3);

        const decoded = base45.decode(toDecode);

        const inflatedCred = pako.inflate(decoded);
        return this._decodeCbor(inflatedCred);
    }

    /**
     * Extracts the credential from CBOR format
     * @private
     * @param {Uint8Array} cborData The credential in CBOR format
     * @returns {Object} The extracted credential
     */
    async _decodeCbor(cborData) {
        const decodedCbor = await cbor.decode(cborData);
        const kid = await this._decodeKid(decodedCbor);
        const credMap = await cbor.decode(decodedCbor.value[2]);
        const issuingCountry = credMap.get(CredKeys.IssuingCountry);
        const issuanceDate = credMap.get(CredKeys.IssuanceDate);
        const expirationDate = credMap.get(CredKeys.ExpirationDate);
        const credential = credMap.get(CredKeys.Credential).get(1);
        const signature = await decodedCbor.value[3];

        return {
            kid,
            issuingCountry,
            issuanceDate,
            expirationDate,
            credential,
            signature,
            cborData
        }
    }

    /**
     * Extracts the kid
     * @private
     * @param {Uint8Array} decodedCbor The credential in CBOR format
     * @returns {string} The kid
     */
    async _decodeKid(decodedCbor) {
        const kid = await this._decodeKidFromUnprotectedMap(decodedCbor);
        if (kid) {
            return kid;
        }
        return this._decodeKidFromProtectedMap(decodedCbor);
    }

    async _decodeKidFromUnprotectedMap(decodedCbor) {
        const unprotectedMap = decodedCbor.value[1];

        if (!(unprotectedMap instanceof Map)
            || !unprotectedMap.get(4)
            || !Buffer.isBuffer(unprotectedMap.get(4))) {
            return null;
        }
        return unprotectedMap.get(4).toString('base64');
    }

    async _decodeKidFromProtectedMap(decodedCbor) {
        const protectedMap = Buffer.isBuffer(decodedCbor.value[0])
            ? await cbor.decode(decodedCbor.value[0]) : undefined;
        if (!protectedMap || !protectedMap.get(4)) {
            return null;
        }
        return protectedMap.get(4).toString('base64');
    }

    /**
     * Validates the credential's signature
     * @private
     * @param {Object} cred The credential 
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {VerificationResult} The signature validation result
     */

    async _isSignatureValid(cred, params) {
        const publicKeyResponse = await this._getPublicKey(cred, params);
        if (!publicKeyResponse.success) {
            return publicKeyResponse;
        }

        const publicKey = publicKeyResponse.message;

        const xBuffer = Buffer.from(publicKey.x, 'base64');
        const yBuffer = Buffer.from(publicKey.y, 'base64');

        const verifier = {
            'key': {
                'kid': cred.kid,
                'x': xBuffer.toString('hex'),
                'y': yBuffer.toString('hex'),
            }
        }

        try {
            await cose.sign.verify(cred.cborData, verifier);
        } catch(e) {
            return new VerificationResult(
                false, `Certificate's signature is not valid :: ${e}`, CRED_TYPE.DCC);
        }

        return new VerificationResult(true, 'Valid EU Credential', CRED_TYPE.DCC);
    }

    /**
     * Gets the public key
     * @private
     * @param {Object} cred The credential 
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {VerificationResult} The public key retrieval results
     */
    async _getPublicKey(cred, params) {
        const keyDerResponse = await getCache().getEuToken(
            ISSUER_ID,
            cred.kid,
            cred.issuingCountry,
            params
        );
        if (!keyDerResponse.success) {
            keyDerResponse.credType = CRED_TYPE.DCC;
            return keyDerResponse;
        }
        const keyDer = keyDerResponse.message;

        if (!keyDer) {
            return new VerificationResult(false, `Unknown Issuer`, CRED_TYPE.DCC);
        }

        try {
            const keystore = jose.JWK.createKeyStore();
            const publicKey = await (await keystore.add(Buffer.from(keyDer, 'base64'), 'x509')).toJSON();
            return new VerificationResult(true, publicKey, CRED_TYPE.DCC);
        } catch {
            return new VerificationResult(false, `Unknown public key format`, CRED_TYPE.DCC);
        }
    }

    /**
     * Validates the credential's contents based on JsonLogic
     * @private
     * @param {Object} cred The credential
     * @returns {VerificationResult} The JsonLogic validation results
     */
    async _isCredentialValid(credential, params) {
        const payload = Object.assign(credential.credential, {
            issuanceDate: moment.unix(credential.issuanceDate).toISOString(),
            expirationDate: moment.unix(credential.expirationDate).toISOString(),
        });

        return this.rulesVerifier.evaluateRules(CRED_TYPE.DCC, payload, params);
    }
}

module.exports = EuCredentialVerifier;
