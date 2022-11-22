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
const { VERIFIER_CONFIG_PATH } = require('../constants');

const agentTrustSelfSigned = new https.Agent({
    rejectUnauthorized: false,
});

const getErrorMsg = (error) => {
    if (error.response) {
        return error.response.status;
    }
    return error.message;
}

let verifierConfigAPI;

class VerifierConfigClient {
    constructor() {
        verifierConfigAPI = undefined;
    }
    
    async getVerifierConfiguration(token, xIssuerID, idAndVersion, params) {
        return this._getVerifierConfiguration(token, xIssuerID, idAndVersion, params, true);
    }

    async getVerifierConfigurationPartial(token, xIssuerID, idAndVersion, params) {
        return this._getVerifierConfiguration(token, xIssuerID, idAndVersion, params, false);
    }

    // eslint-disable-next-line complexity
    async _getVerifierConfiguration(token, xIssuerID, idAndVersion, params, content) {
        const url = content
            ? `/verifier-configurations/content`
            : `/verifier-configurations`;

        const splitIdAndVersion = this._splitIdAndVersion(idAndVersion);

        const headersAndParams = this._getRequestHeaders(token, xIssuerID);
        headersAndParams.params = {
            id: splitIdAndVersion[0],
            version: splitIdAndVersion[1],
        };

        try {
            const response = await this._getClient(params).get(url, headersAndParams);

            let config = response.data.payload.length === 0
                ? undefined
                : response.data.payload[0];

            if (!config) {
                return new VerificationResult(false, `Verifier configuration not found :: ${idAndVersion}`);
            }

            config.deprecated = config.configuration !== undefined;

            if (!config.deprecated && content) {
                config = this._reduceValuesetItems(this._removeDisabled(config));
                
            }

            config.offline = process.env.OFFLINE || process.env.OFFLINE === false
                ? process.env.OFFLINE
                : config.offline;
            
            if (typeof config.offline === 'string') {
                config.offline = (config.offline.toLowerCase() === 'true');
            }

            return new VerificationResult(true, config);
        } catch (err) {
            const msg = `Verifier configuration error :: ${getErrorMsg(err)}`;
            return new VerificationResult(false, msg, undefined, undefined, err);
        }
    }

    _reduceValuesetItems(config) {
        if (!config.valueSets) {
            return config;
        }
        const newConfig = JSON.parse(JSON.stringify(config));
        const newValueSet = {};
        newConfig.valueSets.forEach(v => {
            newValueSet[v.name] = [...v.items.map(item => item.value)];
        });
        newConfig.valueSets = newValueSet;

        return newConfig;
    }

    _removeDisabled(config) {
        if (!config.disabledSpecifications && !config.disabledRules) {
            return config;
        }
        const newConfig = JSON.parse(JSON.stringify(config));
        
        if (newConfig.disabledSpecifications) {
            const disabledIds = newConfig.disabledSpecifications.map(spec => spec.id);

            newConfig.specificationConfigurations = newConfig.specificationConfigurations.filter(
                spec => !disabledIds.includes(spec.id)
            );
        }

        if (newConfig.disabledRules) {
            for (let i = 0; i < newConfig.specificationConfigurations.length; i += 1) {
                const spec = newConfig.specificationConfigurations[i];

                const disabledIds = newConfig.disabledRules.reduce(
                    (acc, rule) => {
                        if (rule.specID === spec.id) {
                            acc.push(rule.id)
                        }
                        return acc;
                    }, []);
                if (disabledIds.length > 0) {
                    spec.rules = spec.rules.filter(rule => !disabledIds.includes(rule.id));
                }
            }
        }
        return newConfig
    }

    _splitIdAndVersion(idAndVersion) {
        const parts = idAndVersion.split(':');
        if (parts.length === 1) {
            parts.push('latest')
        }
        return parts
    }

    _getClient(params) {
        if (verifierConfigAPI) {
            return verifierConfigAPI
        }

        const baseURL = process.env.ISSUER_API
            ? process.env.VERIFIER_CONFIG_API
            : params.getIssuerHostUrl() + VERIFIER_CONFIG_PATH;

        verifierConfigAPI = axios.create({
            baseURL,
            timeout: 60000,
            httpsAgent: agentTrustSelfSigned,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return verifierConfigAPI;
    }

    _getRequestHeaders(token, xIssuerID) {
        if(!token && !xIssuerID) {
            return undefined;
        }
        const headers = {}
        if (token) {
            headers.Authorization = token;
        }

        if (xIssuerID) {
            headers['x-hpass-issuer-id'] = xIssuerID;
        }

        return { headers };
    }
}

module.exports = VerifierConfigClient;
