/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

class VerificationResult {
    constructor(
        success,
        message,
        credType,
        credential,
        error,
        warnings,
        credentialCategory
    ) {
        this.success = success;
        this.message = message;
        if (credType) {
            this.credType = credType;
        }
        if (credential) {
            this.credential = credential;
        }
        if (credentialCategory) {
            this.credentialCategory = credentialCategory;
        }
        if (error) {
            this.error = error;
        }
        if (warnings) {
            this.warnings = warnings;
        }
    }
}

module.exports = VerificationResult;
