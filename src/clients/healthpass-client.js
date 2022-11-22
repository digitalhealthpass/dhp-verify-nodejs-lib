/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const axios = require('axios');
const https = require('https');
const VerificationResult = require('../utils/verification-result');
const { ISSUER_PATH } = require('../constants');

const PAGE_SIZE = 100;

const agentTrustSelfSigned = new https.Agent({
    rejectUnauthorized: false,
});

const getErrorMsg = (error) => {
    if (error.response) {
        return error.response.status;
    }
    return error.message;
}

const UNKNOWN_ISSUER_ERROR = 'Unknown Issuer';

let hpassAPI;

class HealthPassClient {
    constructor() {
        hpassAPI = undefined;
    }

    async getToken(verifierCredential, params) {
        try {
            const response = await this._getClient(params).post('/users/loginWithCredential',
                {
                    credential: verifierCredential
                },
            );
            return new VerificationResult(true, response.data.access_token);
        } catch (err) {
            const msg = `Get token error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getIbmIssuer(token, xIssuerID, issuerID, params) {
        try {
            const response = await this._getClient(params).get(`/issuers/${issuerID}`,
                this._getRequestHeaders(token, xIssuerID)
            );
            return new VerificationResult(true, response.data.payload);
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `IDHP public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getAllIbmIssuers(token, xIssuerID, params) {
        try {
            const headersAndParams = this._getRequestHeaders(token, xIssuerID);
            headersAndParams.params = { pagesize: PAGE_SIZE };

            // TODO: implement paging
            const response = await this._getClient(params).get('/issuers',
                this._getRequestHeaders(token, xIssuerID),
                headersAndParams,
            );

            return new VerificationResult(true, response.data.payload);
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `IDHP all public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getEuToken(token, xIssuerID, kid, country, params) {
        try {
            const headersAndParams = this._getRequestHeaders(token, xIssuerID);
            headersAndParams.params = { kid, country };

            const response = await this._getClient(params).get(
                `/generic-issuers/dcc/`,
                headersAndParams
            );

            const euToken = response.data.payload.payload.find(e => e.kid === kid);

            if (!euToken) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            return new VerificationResult(true, {
                token: euToken.rawData,
                issuingCountry: euToken.country,
            });

        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `DCC public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getAllEuTokens(token, xIssuerID, params) {
        try {
            const headersAndParams = this._getRequestHeaders(token, xIssuerID);
            headersAndParams.params = { pagesize: PAGE_SIZE };

            let bookmark;
            const payload = [];
            // eslint-disable-next-line no-constant-condition
            while(true) {
                if (bookmark) {
                    headersAndParams.params.bookmark = bookmark;
                }
                // eslint-disable-next-line no-await-in-loop
                const response = await this._getClient(params).get(
                    `/generic-issuers/dcc`,
                    headersAndParams,
                );

                payload.push(...response.data.payload.payload);

                if (response.data.payload.record_count < PAGE_SIZE) {
                    break;
                }
                bookmark = response.data.payload.bookmark;
            }

            return new VerificationResult(true, payload);
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `DCC all public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getVciToken(token, xIssuerID, iss, kid, params) {
        try {
            const response = await this._getClient(params).post(
                `/generic-issuers/vci/query`,
                {
                    url: iss
                },
                this._getRequestHeaders(token, xIssuerID)
            );

            if (response.data.payload.length === 0) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }

            const key = response.data.payload[0].keys.find(key => key.kid === kid);
            if (!key) {
                return new VerificationResult(false, `Failed to get public key`);
            }

            return new VerificationResult(true, key);
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `SHC public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getAllVciTokens(token, xIssuerID, params) {
        try {
            const headersAndParams = this._getRequestHeaders(token, xIssuerID);
            headersAndParams.params = { pagesize: PAGE_SIZE };

            let bookmark;
            const payload = [];
            // eslint-disable-next-line no-constant-condition
            while(true) {
                if (bookmark) {
                    headersAndParams.params.bookmark = bookmark;
                }
                // eslint-disable-next-line no-await-in-loop
                const response = await this._getClient(params).get(
                    '/generic-issuers/vci',
                    headersAndParams,
                );

                payload.push(...response.data.payload.payload);

                if (response.data.payload.record_count < PAGE_SIZE) {
                    break;
                }
                bookmark = response.data.payload.bookmark;
            }

            return new VerificationResult(true, payload);
        } catch (err) {
            if (err.response && err.response.status && err.response.status === 404) {
                return new VerificationResult(false, UNKNOWN_ISSUER_ERROR);
            }
            const msg = `SHC all public key error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async getIbmCredentialRevokeStatus(token, xIssuerID, credentialID, params) {
        try {
            const encodedCredentialID = credentialID.replace(/#/g, '%23');
            const response = await this._getClient(params).get(
                `/credentials/${encodedCredentialID}/revoke_status/optional`,
                this._getRequestHeaders(token, xIssuerID)
            );
            return new VerificationResult(true, response.data.payload);
        } catch (err) {
            const msg = `Revoke status error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    _getClient(params) {
        if (hpassAPI) {
            return hpassAPI;
        }
        
        const baseURL = process.env.ISSUER_API
            || params.getIssuerHostUrl() + ISSUER_PATH

        hpassAPI = axios.create({
            baseURL,
            timeout: 60000,
            httpsAgent: agentTrustSelfSigned,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return hpassAPI;
    }

    _getRequestHeaders(token, xIssuerID) {
        return {
            headers: {
                Authorization: token,
                'x-hpass-issuer-id': xIssuerID,
            },
        };
    }
}

module.exports = HealthPassClient;
