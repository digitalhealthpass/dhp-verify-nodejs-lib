/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const oa = require("@govtechsg/open-attestation");
const oaVerify = require("@govtechsg/oa-verify");
const VerificationResult = require("../utils/verification-result");
const VerifierPlugin = require('../verifier/verifier-plugin');
const RulesVerifier = require('../utils/rules-verifier');
const { CRED_TYPE } = require('../constants');


module.exports = class OaVerifier extends VerifierPlugin {

    ETHEREUM_NETWORK = "mainnet";

    constructor() {
        super();
        this.verifier = oaVerify.verificationBuilder(oaVerify.openAttestationVerifiers, {
            network: this.ETHEREUM_NETWORK,
        });
        this.rulesVerifier = new RulesVerifier();
    }

    async decode(params) {
        const credential = params.getCredential();
        if (!this._isOaCredential(credential)) {
            return new VerificationResult(false, null);
        }
        return new VerificationResult(true, 'Credential Decoded', CRED_TYPE.OA, credential);
    }

    /**
     * Performs the credential verification
     * @param {CredentialVerifierParams} params Parameters set by
     * CredentialVerifierBuilder that will be used by credential
     * verifier plugins during credential verification
     * @returns {VerificationResult} Credential verification results
     */
    async verify(credential, params) {
        if (!this._validateSignature(credential)) {
            return new VerificationResult(
                false, "Certificate's signature is not valid", CRED_TYPE.OA, credential
            );
        }

        const walletResp = await this._validOnEthereumWallet(credential);
        if (!walletResp.success) {
            return walletResp;
        }

        return this._isCredentialValid(credential, params);
    }

    getName() {
        return "oa-verifier";
    }

    _validateSignature(credential) {
        return oa.verifySignature(credential);
    }

    async _validOnEthereumWallet(credential) {
        const verifyResp = await this.verifier(credential)
        const errorMsg = this._getVerifyErrorMessage(verifyResp);
        if (errorMsg) {
            return new VerificationResult(
                false, errorMsg, CRED_TYPE.OA, credential, JSON.stringify(verifyResp)
            );
        }
        const isValid =  oaVerify.isValid(verifyResp);
        if (!isValid) {
            return new VerificationResult(
                false, 'Certificate is not found in wallet', CRED_TYPE.OA, credential
            );
        }
        return new VerificationResult(true, "OK");
    }

    async _validateWithVerifier(credential) {
        return this.verifier(credential);
    }

    _getVerifyErrorMessage(verifyResp) {
        const error = verifyResp.find(e => e.status === "ERROR");
        if (!error) {
            return null;
        }
        return error.reason && error.reason.message ? error.reason.message : "Unknown Error"
    }

    _isOaCredential(credential) {
        return JSON.stringify(credential).match(new RegExp("openattestation", "i"))
    }

    async _isCredentialValid(credential, params) {
        const result = await this.rulesVerifier.evaluateRules(CRED_TYPE.OA, credential, params);
        result.credential = credential;

        return result;
    }
}
