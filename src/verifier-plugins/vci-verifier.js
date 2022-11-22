/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const pako = require('pako');

const encryptionUtils = require('../utils/encryption-utils');

const VerifierPlugin = require('../verifier/verifier-plugin');
const VerificationResult = require('../utils/verification-result');
const RulesVerifier = require('../utils/rules-verifier');
const { getCache } = require('../utils/cache');
const { CRED_TYPE, ISSUER_ID } = require('../constants');

/**
 * VCI credential verifier plugin
 */
class VciCredentialVerifier extends VerifierPlugin {
    constructor() {
        super();
        this.rulesVerifier = new RulesVerifier();
    }

    async decode(params) {
        // ECDSA signature
        const getCredentialResult = await this._getCredential(params);
        if (!getCredentialResult.success) {
            return getCredentialResult;
        }
        const credential = getCredentialResult.message;
        return new VerificationResult(true, 'Credential Decoded', CRED_TYPE.SHC, credential);
    }

    async verify(credential, params) {
        const trustedIssuerResult = await this._isTrustedIssuer();
        if (!trustedIssuerResult.success) {
            trustedIssuerResult.credType = CRED_TYPE.SHC
            trustedIssuerResult.credential = credential.payload;
            return trustedIssuerResult;
        }

        const signatureValidResult = await this._isSignatureValid(credential, params);
        if (!signatureValidResult.success) {
            signatureValidResult.credType = CRED_TYPE.SHC
            signatureValidResult.credential = credential.payload;
            return signatureValidResult;
        }

        const credValidResponse = await this._isCredentialValid(credential.payload, params);
        credValidResponse.credential = credential.payload;

        return credValidResponse;
    }

    /**
     * Returns the name of the verifier plugin
     * @returns {string}
     */
    getName() {
        return 'vci-verifier';
    }

    /**
     * Gets the decoded JWS token, base64 decodes the header,
     * inflates the payload, and returns the credential
     * @private
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {Object} The credential
     */
    async _getCredential(params) {
        if (typeof params.getCredential() !== 'string') {
            return new VerificationResult(false, null, CRED_TYPE.SHC);
        }

        const rawCred = params.getCredential();

        if (rawCred.startsWith('HC1:')) {
            return new VerificationResult(false, null, CRED_TYPE.SHC);
        }

        const credentialParts = rawCred.startsWith('shc:/')
            ? this._decodeShc(rawCred).split('.')
            : rawCred.split('.');

        if (!this._checkIsVciCredential(credentialParts)) {
            return new VerificationResult(false, null, CRED_TYPE.SHC);
        }

        const header = JSON.parse(Buffer.from(credentialParts[0], 'base64').toString());

        if (!this._isValidHeader(header)
        ) {
            return new VerificationResult(
                false, 'Header must include a kid, zip = DEF, and alg = ES256'
            );
        }

        const inflateResult = this._inflatePayload(credentialParts[1]);
        
        if (!inflateResult.success) {
            return inflateResult
        }

        return new VerificationResult(true, {
            header,
            payload: inflateResult.message,
            credentialParts
        });
    }

    /**
     * Decodes the credential from SCH format to JWS
     * @private
     * @param {string} sch The credential in SCH format
     * @returns {string} The credential in JWS format
     */
    _decodeShc(sch) {
        return sch
            .substr(5)
            .match(/.{2}/g)
            .map((value) => String.fromCharCode(parseInt(value, 10) + 45))
            .join('');
    }

    /**
     * Checks if supplied credential is a VCI credential.
     * If false, this plugin will not attempt to verify the credential
     * @private
     * @param {any} splitJwsCred The JWS credential split into parts
     * @returns {boolean}
     */
    _checkIsVciCredential(splitJwsCred) {
        return (splitJwsCred.length === 3);
    }

    /**
     * Validates the JWS header. Currently only supports 
     * deflate compression and es256 encryption
     * @private
     * @param {Object} header The JWS header
     * @returns {boolean}
     */
    _isValidHeader(header) {
        if (typeof header !== 'object') {
            return false;
        }
        const hasValues = (
            header.zip &&
            header.alg &&
            header.kid
        );

        // TODO: currently only supports DEF and ES256
        return (hasValues && header.zip === 'DEF' && header.alg === 'ES256');
    }

    /**
     * Inflates the deflated credential payload
     * @param {string} payload base64 encoded deflated credential payload
     * @returns {VerificationResult} VerificationResult containing the inflated credential
     */
    _inflatePayload(payload) {
        try {
            const inflated = pako.inflateRaw(Buffer.from(payload, 'base64'), { to: 'string' });
            return new VerificationResult(true, JSON.parse(inflated));
        } catch(e) {
            return new VerificationResult(false, `VCI payload inflate failed :: ${e}`, CRED_TYPE.SHC);
        }
    }

    async _isTrustedIssuer() {
        // TODO: evalute issuer based on trust list

        return new VerificationResult(true, 'OK');
    }

    /**
     * Validates the credential's signature
     * @private
     * @param {Object} credential The credential
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {VerificationResult} The signature validation result
     */
    async _isSignatureValid(credential, params) {
        const publicKeyResponse = await this._getPublicKey(credential, params);
        if (!publicKeyResponse.success) {
            return publicKeyResponse;
        }

        const publicKey = publicKeyResponse.message;
        const headerAndPayload = `${credential.credentialParts[0]}.${credential.credentialParts[1]}`;
        const signature = credential.credentialParts[2];
        return encryptionUtils.verifyEcdsaSignature(headerAndPayload, signature, publicKey);
    }

    /**
     * Gets the public key
     * @private
     * @param {Object} credential The credential 
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {VerificationResult} The public key retrieval results
     */
    async _getPublicKey(credential, params) {
        const tokenResponse = await getCache().getVciToken(
            ISSUER_ID,
            credential.payload.iss,
            credential.header.kid,
            params
        );
        if (!tokenResponse.success) {
            return tokenResponse;
        }
        return new VerificationResult(true, tokenResponse.message);
    }

    /**
     * Validates the credential's contents based on JsonLogic
     * @private
     * @param {Object} credentialPayload The credential
     * @returns {VerificationResult} The JsonLogic validation results
     */
    async _isCredentialValid(credentialPayload, params) {
        return this.rulesVerifier.evaluateRules(CRED_TYPE.SHC, credentialPayload, params);
    }
}

module.exports = VciCredentialVerifier;
