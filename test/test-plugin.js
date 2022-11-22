/* eslint-disable max-classes-per-file */
/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const VerifierPlugin = require('../src/verifier/verifier-plugin');
const VerificationResult = require('../src/utils/verification-result');

class GoodTestVerifier extends VerifierPlugin {
    async decode(params) {
        const credential = params.getCredential();
        if (!this._checkIsGoodTestCredential(credential)) {
            return new VerificationResult(false, null);
        }

        return new VerificationResult(true, "OK", "TEST", params.getCredential());
    }

    async verify() {
        return new VerificationResult(true, 'Valid Test Plugin Credential');
    }

    _checkIsGoodTestCredential(cred) {    
        return (typeof cred === 'object' && cred.test);
    }

    getName() {
        return 'test-verifier';
    }
}

class TestVerifierWithoutGetName extends VerifierPlugin {
    async decode(params) {
        const credential = params.getCredential();
        if (!this._checkIsGoodTestCredential(credential)) {
            return new VerificationResult(false, null);
        }

        return new VerificationResult(true, "OK", "TEST", params.getCredential());
    }

    async verify() {
        return new VerificationResult(true, 'Valid Test Plugin Credential');
    }

    _checkIsGoodTestCredential(cred) {    
        return (typeof cred === 'object' && cred.test);
    }
}

class TestVerifierWithoutVerify extends VerifierPlugin {
    getName() {
        return 'test-verifier';
    }
}

class VerifierPluginWithoutExtends {
    async decode(params) {
        const credential = params.getCredential();
        if (!this._checkIsGoodTestCredential(credential)) {
            return new VerificationResult(false, null);
        }

        return new VerificationResult(true, "OK", "TEST", params.getCredential());
    }

    async verify() {
        return new VerificationResult(true, 'Valid Test Plugin Credential');
    }

    _checkIsGoodTestCredential(cred) {    
        return (typeof cred === 'object' && cred.test);
    }

    getName() {
        return 'test-verifier';
    }
}

module.exports = {
    GoodTestVerifier,
    TestVerifierWithoutGetName,
    TestVerifierWithoutVerify,
    VerifierPluginWithoutExtends
};
 