/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const VerificationResult = require('./verification-result');
const { ISSUER_ID } = require('../constants');

class PreCacheUtil {
    constructor(cache, credentialVerifierParams) {
        this._cache = cache;
        this._params = credentialVerifierParams;
    }

    async preCache(initialCall, offline) {
        if (!initialCall) {
            this._cache.flushAll();
        }

        const verifierConfigResp = await this._cache.getVerifierConfig(
            ISSUER_ID, this._params.getVerifierCredentialDecoded().credentialSubject.configId, this._params, true
        );

        if (!verifierConfigResp.success) {
            return verifierConfigResp;
        }

        const verifierConfig = verifierConfigResp.message;

        if (offline) {
            const pending = verifierConfig.deprecated
                ? this.getPendingRequestsDeprecated(verifierConfig)
                : this.getPendingRequests(verifierConfig);

            const results = await Promise.all(pending);

            const failureResponse = results.find(result => !result.success);
            if (failureResponse) {
                return failureResponse;
            }
        }

        return new VerificationResult(true, "Pre-caching was successful");
    }

    getPendingRequests(verifierConfig) {
        const pending = [];
        let ibmPending;
        let euPending;
        let vciPending;

        // eslint-disable-next-line complexity
        verifierConfig.specificationConfigurations.forEach(spec => {
            switch(spec.credentialSpec) {
                case 'IDHP':
                case 'GHP':
                case 'VC':
                    if (!ibmPending) {
                        ibmPending = this._cache.getAllIbmIssuersPromise(ISSUER_ID, this._params);
                    }
                    break;
                case 'DCC':
                    if (!euPending) {
                        euPending = this._cache.getAllEuTokens(ISSUER_ID, this._params);
                    }
                    break;
                case 'SHC':
                    if (!vciPending) {
                        vciPending = this._cache.getAllVciTokens(ISSUER_ID, this._params);
                    }
                    break;
                default:
                    break;        
            }
        });

        if (ibmPending) {
            pending.push(ibmPending);
        }
        if (euPending) {
            pending.push(euPending);
        }
        if (vciPending) {
            pending.push(vciPending);
        }

        return pending;
    }

    getPendingRequestsDeprecated(verifierConfig) {
        const pending = [];
        
        if (verifierConfig.configuration.IDHP
            || verifierConfig.configuration.GHP
            || verifierConfig.configuration.VC
        ) {
            pending.push(this._cache.getAllIbmIssuers(ISSUER_ID, this._params));
        }

        if (verifierConfig.configuration.DCC) {
            pending.push(this._cache.getAllEuTokens(ISSUER_ID, this._params));
        }

        if (verifierConfig.configuration.SHC) {
            pending.push(this._cache.getAllVciTokens(ISSUER_ID, this._params));
        }

        return pending;
    }
}

module.exports = PreCacheUtil;
