// (c) Copyright Merative US L.P. and others 2020-2022 
//
// SPDX-Licence-Identifier: Apache 2.0

const crypto = require('crypto');
const ECDSA = require('ecdsa-secp256r1')
const CryptoJS = require("crypto-js");
const base64url = require('base64url');


const VerificationResult = require('./verification-result');

const SHA256 = 'sha256';

const verifyRsaSignature = (credential, signature, publicJwk) => {        
    try {
        // verify will throw an excaption if issue with key structure
        // else it returns a boolean
        const verifyResult = crypto.verify(
            SHA256,
            Buffer.from(JSON.stringify(credential)),
            {
                key: publicJwk,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            },
            Buffer.from(signature, 'base64')
        );
        if (verifyResult) {
            return new VerificationResult(true, `Certificate's signature passed verification`);
        }
        return new VerificationResult(false, `Certificate's signature is not valid`);
    } catch(e) {
        return new VerificationResult(false, `Certificate's signature is not valid. ${e.message}`);
    }
}

const verifyEcdsaSignature = (credential, signature, publicJwk) => {
    const publicKey = ECDSA.fromJWK(publicJwk);

    try {
        const result =  publicKey.verify(credential, signature);
        if (result) {
            return new VerificationResult(true, `Certificate's signature passed verification`);
        }
        return new VerificationResult(false, `Certificate's signature is not valid`);
    } catch(e) {
        return new VerificationResult(false, `Certificate's signature is not valid. ${e.message}`);
    }
}

const createHmac = (value, secret) => {
    const hash = CryptoJS.HmacSHA256(value, secret);
    const hmac = base64url.fromBase64(CryptoJS.enc.Base64.stringify(hash));
    const nonce = base64url.fromBase64(CryptoJS.enc.Base64.stringify(secret));

    return {
        nonce,
        hmac,
        algorithm: 'HS256',
    }
}

const verifyHmac = (value, hmac, secret) => {
    const nonce = secret.replaceAll('-', '+').replaceAll('_', '/');

    const decodedSecret = CryptoJS.enc.Base64.parse(nonce);
    delete decodedSecret.$super;

    const newHmac = createHmac(value, decodedSecret);

    return base64url.fromBase64(hmac) === newHmac.hmac;
}

module.exports = {
    verifyRsaSignature,
    verifyEcdsaSignature,
    createHmac,
    verifyHmac,
};
