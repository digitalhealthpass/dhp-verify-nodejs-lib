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
const { METERING_PATH } = require('../constants');

const agentTrustSelfSigned = new https.Agent({
    rejectUnauthorized: false,
});

const getErrorMsg = (error) => {
    if (error.response) {
        return error.response.status;
    }
    return error.message;
}

let meteringAPI;

class MeteringClient {
    constructor() {
        meteringAPI = undefined;
    }

    async getHealth(token, params) {
        try {
            const response = await this._getClient(params).get(`/health`,
                this._getRequestHeaders(token)
            );
            return new VerificationResult(true, response.data.payload);
        } catch (err) {
            const msg = `Data connectivity error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    async postMetering(token, payload, params) {
        try {
            await this._getClient(params).post('/metrics/verifier/batch',
                {
                    data: payload
                },
                this._getRequestHeaders(token)
            );
            return new VerificationResult(true, 'OK');
        } catch (err) {
            const msg = `Post data error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    _getClient(params) {
        if (meteringAPI) {
            return meteringAPI;
        }
        const baseURL = process.env.ISSUER_API
            ? process.env.METERING_API
            : params.getIssuerHostUrl() + METERING_PATH

        meteringAPI = axios.create({
            baseURL,
            timeout: 60000,
            httpsAgent: agentTrustSelfSigned,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return meteringAPI;
    }

    _getRequestHeaders(token) {
        return {
            headers: {
                Authorization: token,
            },
        };
    }
}

module.exports = MeteringClient;
