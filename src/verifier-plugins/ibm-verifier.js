/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const JSONNormalize = require('json-normalize');
const encryptionUtils = require('../utils/encryption-utils');
const VerifierPlugin = require('../verifier/verifier-plugin');
const { getCache } = require('../utils/cache');
const obfuscationUtils = require('../utils/obfuscation-utils');
const VerificationResult = require('../utils/verification-result');
const RulesVerifier = require('../utils/rules-verifier');
const { CRED_TYPE, ISSUER_ID } = require('../constants');

/**
 * IDHC and GHP credential verifier plugin
 */
class IbmCredentialVerifier extends VerifierPlugin {
    constructor() {
        super();
        this.rulesVerifier = new RulesVerifier();
    }

    async decode(params) {
        const credential = this._getCredential(params);

        if (!this._checkIsIbmCredential(credential)) {
            return new VerificationResult(false, null, CRED_TYPE.IDHP);
        }

        return new VerificationResult(true, 'Credential Decoded', this._getCredType(credential), credential);
    }

    /**
     * Performs the credential verification
     * @param {CredentialVerifierParams} params Parameters set by 
     * CredentialVerifierBuilder that will be used by credential
     * verifier plugins during credential verification
     * @returns {VerificationResult} Credential verification results
     */
    async verify(credential, params) {
        const issuerId = ISSUER_ID;
        const credType = this._getCredType(credential)
        let verification;

        verification = await this._isSignatureValid(issuerId, credential, params);
        if (!verification.success) {
            verification.credType = credType;
            verification.credential = credential;
            return verification;
        }

        verification = await this._checkRevokeStatus(issuerId, credential, params);
        if (!verification.success) {
            return new VerificationResult(
                false, `Revoke status validation failed :: ${verification.message}`, credType, credential
            );
        }

        verification = this._checkObfuscation(credential);
        if (!verification.success) {
            return new VerificationResult(
                false, `Obfuscation validation failed :: ${verification.message}`, credType, credential
            );
        }

        return this._isCredentialValid(credential, credType, params);
    }

    /**
     * Returns the name of the verifier plugin
     * @returns {string}
     */
    getName() {
        return 'idhp-verifier';
    }

    _getCredType(credential) {
        if (credential.type.includes('IBMDigitalHealthPass')) {
            return CRED_TYPE.IDHP;
        }
        if (credential.type.includes('GoodHealthPass')) {
            return CRED_TYPE.GHP;
        }
        return CRED_TYPE.VC;
    }

    /**
     * Base64 decodes if needed and returns the credential
     * @private
     * @param {CredentialVerifierParams} params Credential verifier params
     * @returns {Object} The credential
     */
    _getCredential(params) {
        let cred = params.getCredential();
        if (typeof cred === 'string') {
            try {
                cred = JSON.parse(Buffer.from(cred, 'base64').toString())
            } catch(e) {
                cred = params.getCredential();
            }
        }
        return cred;
    }

    /**
     * Checks if supplied credential is an IDHC credential.
     * If false, this plugin will not attempt to verify the credential
     * @private
     * @param {any} cred The credential
     * @returns {boolean}
     */
    // eslint-disable-next-line complexity
    _checkIsIbmCredential(cred) {
        if (cred.credentialSubject
            && cred.credentialSubject.type
            && cred.credentialSubject.type === 'id') {
            return false;
        }
        return (typeof cred === 'object'
            && cred.proof
            && cred.proof.signatureValue
            && cred.issuer
            && cred.type
            && cred.type.includes('VerifiableCredential')
        );
    }
    
    /**
     * Validates the credential's signature
     * @private
     * @param {string} authToken The authorization token
     * @param {string} issuerId The issuer id
     * @param {Object} credential The credential
     * @returns {VerificationResult} The signature validation result
     */
    async _isSignatureValid(issuerId, credential, params) {
        const signature = credential.proof.signatureValue;        
        const jwkKeyResponse = await this._getPublicKey(
            issuerId, credential.issuer, credential.proof.creator, params
        );
        if (!jwkKeyResponse.success) {
            return jwkKeyResponse;
        }

        const jwkKey = jwkKeyResponse.message;        
        const unsignedCredential = JSON.parse(JSON.stringify(credential));
        delete unsignedCredential.proof.signatureValue;
        delete unsignedCredential.obfuscation;
        const normalizedCredential = JSONNormalize.normalizeSync(unsignedCredential);

        return encryptionUtils.verifyEcdsaSignature(normalizedCredential, signature, jwkKey);
    }

    async _getPublicKey(issuerId, credIssuer, creator, params) {
        const issuerResponse = await getCache().getIbmIssuer(
            issuerId, credIssuer, params
        );
        if (!issuerResponse.success) {
            return issuerResponse;
        }
        
        const issuer = issuerResponse.message;

        let jwkKey;
        issuer.publicKey.forEach((key) => {
            if (key.id === creator) {
                jwkKey = key.publicKeyJwk;
            }
        });

        if (!jwkKey) {
            return new VerificationResult(false, "Unknown Issuer");
        }
        return new VerificationResult(true, jwkKey);
    }

    /**
     * Check's if the credential's revoke status
     * @private
     * @param {string} authToken The authorization token
     * @param {string} issuerId The issuer id
     * @param {Object} credential The credential
     * @returns {VerificationResult} The revoke status result result
     */
    async _checkRevokeStatus(issuerId, credential, params) {
        const revokeStatusResponse = await getCache().getIbmCredentialRevokeStatus(
            issuerId, credential.id, params
        );

        // Pre-caching revoke status has not been planned.  Ignore network errors for now.
        if (!revokeStatusResponse.success) {
            // return revokeStatusResponse;
            return new VerificationResult(true, 'Unable to determine revoke status');
        }

        const revokeStatus = revokeStatusResponse.message;
        
        if (revokeStatus.exists) {
            return new VerificationResult(false, 'Credential is revoked');
        }

        return new VerificationResult(true, 'Credential is not revoked');
    }

    /**
     * Verifies any obfuscated values in the credential are untampered
     * @private
     * @param {Object} credential The credential
     * @returns {boolean}
     */
    _checkObfuscation(credential) {
        return obfuscationUtils.verifyObfuscation(credential);
    }

    /**
     * Validates the credential's contents based on JsonLogic
     * @private
     * @param {Object} credential The credential
     * @returns {VerificationResult} The JsonLogic validation results
     */
    async _isCredentialValid(credential, credType, params) {
        const result = await this.rulesVerifier.evaluateRules(credType, credential, params);
        result.credential = credential;

        return result;
    }
}

module.exports = IbmCredentialVerifier;
