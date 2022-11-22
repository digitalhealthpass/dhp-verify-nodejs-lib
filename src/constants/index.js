/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const ISSUER_PATH = '/api/v1/credential-issuer';
const VERIFIER_CONFIG_PATH = '/api/v1/verifier/config/api/v1';
const METERING_PATH = '/api/v1/metering';

const CACHE_CHECK_PERIOD = 300; // 5 minutes

const CACHE_TYPE = {
    IBM_ISSUER: 'ibmIssuer',
    IBM_ALL_ISSUERS: 'ibmAllIssuers',
    IBM_REVOKE_STATUS: 'ibmRevokeStatus',
    EU_TOKEN: 'euToken',
    EU_ALL_TOKENS: 'euTokens',
    VCI_TOKEN: 'vciToken',
    VCI_ALL_TOKENS: 'vciTokens',
    VERIFIER_CONFIG: 'verifierConfig',
    VERIFIER_CONFIG_CONTENT: 'verifierConfigContent',
    TOKEN: 'token',
    METERING: 'metering',
}

const CRED_TYPE = {
    IDHP: 'IDHP',
    GHP: 'GHP',
    SHC: 'SHC',
    DCC: 'DCC',
    DIVOC: 'DIVOC',
    VC: 'VC',
    OA: "OA",
    ID: "ID",
    CONSENT_RECEIPT: "CONSENT_RECEIPT",
    CONSENT_REVOKE: "CONSENT_REVOKE",
    UNKNOWN: 'UNKNOWN',
}

// Always DSC for now but may change in the future;
const EU_CRED_TYPE = 'DSC';

const ISSUER_ID = 'hpass.issuer1';

const SCANS_BEFORE_SENDING_METERING = 100;
const SECONDS_BEFORE_SENDING_METERING = 3600 // One hour;
const RETRY_SECONDS_SENDING_METERING = 60 // One minute;

const VERIFIER_CONFIG_EXPIRATION_WARNING_PERCENT = .90;
const CACHE_EXPIRATION_WARNING_PERCENT = .90;

module.exports = {
    CACHE_CHECK_PERIOD,
    CACHE_TYPE,
    CRED_TYPE,
    EU_CRED_TYPE,
    ISSUER_ID,
    SCANS_BEFORE_SENDING_METERING,
    SECONDS_BEFORE_SENDING_METERING,
    RETRY_SECONDS_SENDING_METERING,
    VERIFIER_CONFIG_EXPIRATION_WARNING_PERCENT,
    CACHE_EXPIRATION_WARNING_PERCENT,
    ISSUER_PATH,
    METERING_PATH,
    VERIFIER_CONFIG_PATH,
}
