/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const axios = require('axios');
const rax = require('retry-axios');
const VerificationResult = require('../utils/verification-result');

const getErrorMsg = (error) => {
    if (error.response) {
        return error.response.status;
    }
    return error.message;
}

class AppID {
    async getToken() {
        try {
            const loginClient = this._appIdLoginClient();

            const requestBody = {
                allowAnonymousLogin: true,
                allowCreateNewAnonymousUser: true,
                grant_type: 'client_credentials',
            };

            const response = await loginClient.post('/', new URLSearchParams(requestBody).toString());
            return new VerificationResult(true, response.data.access_token);
        } catch (err) {
            const msg = `Get token error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    };

    _appIdLoginClient() {
        if (this.loginClient) {
            return this.loginClient;
        }
        this.loginClient = this._getLoginClient();

        this.loginClient.defaults.raxConfig = this._getRaxConfig(this.loginClient)

        rax.attach(this.loginClient);
        return this.loginClient;
    };

    _getLoginClient() {
        const url = process.env.APP_ID_URL;
        const clientID = process.env.APP_ID_CLIENT_ID;
        const secret = process.env.APP_ID_SECRET;

        return axios.create({
            baseURL: `${url}/token`,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                accept: 'application/json',
            },
            auth: {
                username: clientID,
                password: secret,
            },
        });
    }

    _getRaxConfig(loginClient) {
        const retries = 1;
        const retryDelay = 3000;

        return {
            instance: loginClient,
            retry: retries,
            noResponseRetries: retries, // retry when no response received (such as on ETIMEOUT)
            statusCodesToRetry: [[500, 599]], // retry only on 5xx responses (no retry on 4xx responses)
            httpMethodsToRetry: ['POST', 'GET', 'HEAD', 'PUT'],
            backoffType: 'static', // options are 'exponential' (default), 'static' or 'linear'
            retryDelay,
            onRetryAttempt: () => {},
        };
    }
}

module.exports = AppID;
