/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/**
 * Abstract class that all verifier plugins must inherit
 */
class VerifierPlugin {
    constructor() {
        if (this.constructor === VerifierPlugin) {
            throw new Error("Abstract class cannot be instantiated");
        }
    }


    /**
     * @param {CredentialVerifierParams} params Parameters set by 
     * CredentialVerifierBuilder that will be used by credential
     * verifier plugins during credential verification
     * @returns {VerificationResult} Credential decode results
     */
    // eslint-disable-next-line no-unused-vars
    async decode(params) {
        throw new Error("decode() method must be implemented");
    }

    /**
     * Performs the credential verification
     * @param {Object} credential The decoded credential
     * @param {CredentialVerifierParams} params Parameters set by 
     * CredentialVerifierBuilder that will be used by credential
     * verifier plugins during credential verification
     * @returns {VerificationResult} Credential verification results
     */
    // eslint-disable-next-line no-unused-vars
    async verify(credential, params) {
        throw new Error("verify() method must be implemented");
    }

    /**
     * Returns the name of the verifier
     * @returns {string}
     */
    getName() {
        throw new Error("getName() method must be implemented");
    }
}

module.exports = VerifierPlugin;
