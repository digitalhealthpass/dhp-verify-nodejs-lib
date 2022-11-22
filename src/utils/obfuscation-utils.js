// (c) Copyright Merative US L.P. and others 2020-2022 
//
// SPDX-Licence-Identifier: Apache 2.0

const jp = require('jsonpath');

const VerificationResult = require('./verification-result');
const encryptionUtils = require('./encryption-utils');

const validateObfuscation = (obfuscation) => {
    let error;
    if (!Array.isArray(obfuscation)) {
        error = 'Obfuscation must be an array';
    } else if (obfuscation.length === 0) {
        error = 'Obfuscation array is empty.  It must either be populated or omitted';
    } else {
        const set = new Set(obfuscation);
        if (set.size !== obfuscation.length) {
            error = 'Obfuscation cannot contain duplicates';
        }
    }

    return error;
}

const verifyObfuscation = (credential) => {
    const { obfuscation } = credential;
    if (!obfuscation) {
        return new VerificationResult(true, 'No obfuscation');
    }

    const error = validateObfuscation(obfuscation);
    if (error) {
        return new VerificationResult(false, error);
    }
    
    for(let i = 0; i < obfuscation.length; i += 1) {
        const o = obfuscation[i];

        const hmac = jp.query(
            credential, `$.credentialSubject.${o.path}`)[0] || undefined;

        if (!hmac) {
            return new VerificationResult(
                false, `Unable to find obfuscated value in path ${o.path}`
            );
        }
        
        const isVerified = encryptionUtils.verifyHmac(o.val, hmac, o.nonce);

        if (!isVerified) {
            return new VerificationResult(
                false, `Unable to deobfuscate value from path ${o.path}`
            );
        }
    }

    return new VerificationResult(true, "Obfuscation validated");
}

module.exports = {
    verifyObfuscation,
}
