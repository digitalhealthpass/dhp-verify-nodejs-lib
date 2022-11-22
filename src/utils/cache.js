/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

// TODO: remove all xIssuerID from params since it now comes from a constant

const NodeCache = require("node-cache");
const jwt = require('jsonwebtoken');
const AsyncLock = require('async-lock');
const cron = require('node-cron');

const HealthPassClient = require('../clients/healthpass-client');
const VerifierConfigClient = require('../clients/verifier-config-client');
const AppID = require('../clients/appid-client');
const VerificationResult = require('./verification-result');
const PreCacheUtil = require('./pre-cache-util');

const {
    CACHE_TYPE,
    EU_CRED_TYPE,
    VERIFIER_CONFIG_EXPIRATION_WARNING_PERCENT,
    CACHE_EXPIRATION_WARNING_PERCENT,
    ISSUER_ID,
} = require('../constants')

class Cache {
    constructor(metering) {
        this.metering = metering;

        this.cache = new NodeCache({
            useClones: false,
        });
        
        this.lock = new AsyncLock();
        
        this.healthPassClient = new HealthPassClient();
        this.verifierConfigClient = new VerifierConfigClient();
        this.appId = new AppID();

        this.verifierConfigRefreshTask;
        this.cacheRefreshTask;
    }

    async getAllIbmIssuers(xIssuerID, params) {
        const key = `${CACHE_TYPE.IBM_ALL_ISSUERS}::${xIssuerID}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getAllIbmIssuers,
            [ xIssuerID ],
        );
        return processRequestResponse;
    }

    async getIbmIssuer(xIssuerID, issuerID, params) {
        // First check if full issuer list was precached.  If so, get from there.
        const allIssuersKey = `${CACHE_TYPE.IBM_ALL_ISSUERS}::${xIssuerID}`;
        const allIssuersResp = this._getCacheEntry(allIssuersKey);
        if (!allIssuersResp.success) {
            return allIssuersResp;
        }
        const allIssuers = allIssuersResp.message;

        if (allIssuers) {
            const issuer = allIssuers.find(i => i.id === issuerID);
            if (issuer) {
                return new VerificationResult(true, issuer);
            }
            return new VerificationResult(false, "Unknown Issuer");
        }

        const key = `${CACHE_TYPE.IBM_ISSUER}::${xIssuerID}::${issuerID}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getIbmIssuer,
            [ xIssuerID, issuerID ],
        );
        return processRequestResponse;
    }

    async getIbmCredentialRevokeStatus(xIssuerID, credentialID, params) {
        const key = `${CACHE_TYPE.IBM_REVOKE_STATUS}::${xIssuerID}::${credentialID}`
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getIbmCredentialRevokeStatus,
            [ xIssuerID, credentialID ],
        );
        return processRequestResponse;
    }

    async getAllEuTokens(xIssuerID, params) {
        const key = `${CACHE_TYPE.EU_ALL_TOKENS}::${xIssuerID}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getAllEuTokens,
            [ xIssuerID ],
        );
        return processRequestResponse;
    }

    async getEuToken(xIssuerID, kid, country, params) {

        // First check if full list was precached.  If so, get from there.
        const allIssuersKey = `${CACHE_TYPE.EU_ALL_TOKENS}::${xIssuerID}`;
        const allIssuersResp = this._getCacheEntry(allIssuersKey);
        if (!allIssuersResp.success) {
            return allIssuersResp;
        }
        const allIssuers = allIssuersResp.message;

        if (allIssuers) {
            const issuer = allIssuers.find(
                i => i.certificateType === EU_CRED_TYPE && i.kid === kid && i.country === country 
            );
            if (issuer) {
                return new VerificationResult(true, issuer.rawData);
            }
            return new VerificationResult(false, "Unknown Issuer");
        }

        const key = `${CACHE_TYPE.EU_TOKEN}::${xIssuerID}::${kid}::${country}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getEuToken,
            [ xIssuerID, kid, country ],
        );

        if (!processRequestResponse.success) {
            return processRequestResponse;
        }

        const { token, issuingCountry } = processRequestResponse.message;
        if (issuingCountry !== country) {                
            return new VerificationResult(false, "Unknown Issuer");
        }
        return new VerificationResult(true, token);
    }

    async getAllVciTokens(xIssuerID, params) {
        const key = `${CACHE_TYPE.VCI_ALL_TOKENS}::${xIssuerID}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getAllVciTokens,
            [ xIssuerID ],
        );
        return processRequestResponse;
    }

    async getVciToken(xIssuerID, url, kid, params) {
        const cleanUrl = (url) => {
            if (url.endsWith('/')) {
                return url.substring(0, url.length - 1);
            }
            return url;
        }

        const cleanedUrl = cleanUrl(url);

        // First check if full list was precached.  If so, get from there.
        const allIssuersKey = `${CACHE_TYPE.VCI_ALL_TOKENS}::${xIssuerID}`;
        const allIssuersResp = this._getCacheEntry(allIssuersKey);
        if (!allIssuersResp.success) {
            return allIssuersResp;
        }
        const allIssuers = allIssuersResp.message;

        if (allIssuers) {
            const issuer = allIssuers.find(i => {
                return cleanUrl(i.url) === cleanedUrl;
            });
            if (issuer) {
                const key = issuer.keys.find(key => key.kid === kid);
                if (key) {
                    return new VerificationResult(true, key);
                }
            }
            return new VerificationResult(false, "Unknown Issuer");
        }

        const key = `${CACHE_TYPE.VCI_TOKEN}::${xIssuerID}::${cleanedUrl}::${kid}`;
        const processRequestResponse = await this._processRequest(
            key,
            params,
            this.healthPassClient,
            this.healthPassClient.getVciToken,
            [ xIssuerID, cleanedUrl, kid ],
        );
        return processRequestResponse;
    }

    flushAll() {
        this.cache.flushAll();
    }

    async getVerifierConfig(xIssuerID, idAndVersion, params, skipCache = false) {
        const key = `${CACHE_TYPE.VERIFIER_CONFIG_CONTENT}::${xIssuerID}::${idAndVersion}`;
        if (!skipCache) {
            const foundResp = this._getCacheEntry(key);
            const found = foundResp.message;
    
            if (found) {
                return new VerificationResult(true, found);
            }            
        }

        const tokenResponse = await this.getToken(params);
        if (!tokenResponse.success) {
            return tokenResponse;
        }

        const configResponse = await this.verifierConfigClient.getVerifierConfiguration(
            tokenResponse.message, xIssuerID, idAndVersion, params
        );
        
        if (!configResponse.success) {
            return configResponse;
        }

        this._setCacheEntry(key, configResponse.message, params);
        this._initializeFromConfig(
            configResponse.message, idAndVersion, params
        );
        return configResponse;
    }

    async getTrustLists(xIssuerID, credType, verifierConfigId, params) {
        const tokenResponse = await this.getToken(params);
        if (!tokenResponse.success) {
            return tokenResponse;
        }
        const token = tokenResponse.message;
        const configResult = await this.getVerifierConfig(
            token,
            xIssuerID,
            verifierConfigId,
            params);

        if (!configResult.success) {
            return configResult;
        }

        const config = configResult.message;

        if (!config.configuration[credType]) {
            return new VerificationResult(false, 'Trust lists not found');
        }

        return new VerificationResult(true, !config.configuration.credType.trustLists);
    }

    

    async getRules(xIssuerID, credType, verifierConfigIdAndVersion, params) {
        const configResult = await this.getVerifierConfig(
            xIssuerID,
            verifierConfigIdAndVersion,
            params);

        if (!configResult.success) {
            return configResult;
        }

        const config = configResult.message;

        if (!config.configuration[credType]) {
            return new VerificationResult(true, [], credType, null, null, ['Rules not found']);
        }

        const rules = config.configuration[credType]['rule-sets'].reduce(
            (acc, ruleSet) => {
                acc.push(...ruleSet.rules)
                return acc;
            }, []
        );

        return new VerificationResult(true, rules);
    }

    async getMetadataMapping(xIssuerID, credType, verifierConfigIdAndVersion, params) {
        const configResult = await this.getVerifierConfig(
            xIssuerID,
            verifierConfigIdAndVersion,
            params);

        if (!configResult.success) {
            return configResult;
        }

        const config = configResult.message;

        if (!config.configuration[credType]) {
            return new VerificationResult(
                true, [], credType, null, null, [`Display mapping not found for ${credType}`]
            );
        }

        const mapping = config.configuration[credType].display.reduce(
            (acc, displaySet) => {
                acc.push(...displaySet.fields)
                return acc;
            }, []
        );

        const results = new VerificationResult(true, mapping);

        return results;
    }

    async getToken(params, bypassCache = false) {
        let token;

        if (!bypassCache) {
            token = this.cache.get('token');
            if (token) {
                // extra precaution in case the refresh handler does not fire for some reason
                if (!this._isTokenExpired(token.value)) {
                    return new VerificationResult(true, token.value);   
                }
            }
        }

        const verifierCredDecoded = params.getVerifierCredentialDecoded();

        const tokenReponse = verifierCredDecoded.credentialSubject.useAppId
            ? await this.appId.getToken()
            : await this.healthPassClient.getToken(
                params.getVerifierCredential(), params
            );

        if (!tokenReponse.success) {
            return tokenReponse;
        }

        token = tokenReponse.message;

        const refreshMS = this._getTokenRefreshMS(token);
        setTimeout(this._tokenRefreshHandler(this, params), refreshMS);
        
        const payload = {
            value: `Bearer ${token}`,
            params
        }

        this.cache.set(CACHE_TYPE.TOKEN, payload, refreshMS + 60000);
        return new VerificationResult(true, payload.value);
    }

    getCacheExpirationWarning() {
        const now = new Date();
        if (now >= this.cacheExpirationDate || now < this.cacheExpirationWarningDate) {
            return null;
        }
        // eslint-disable-next-line max-len
        return `The cache will expire on ${this.cacheExpirationDate.toLocaleString()}.  Connect to network to refresh cache before then to continue verifying credentials.  `;
    }

    getConfigExpirationWarning() {
        const now = new Date();
        if (now >= this.verifierCredExpiration || now < this.verifierCredExpirationWarningDate) {
            return null;
        }
        // eslint-disable-next-line max-len
        return `Verifier credential will expired on ${this.verifierCredExpiration.toLocaleString()}.  Set a new verifier credential while connected to network before then to continue verifying credentials.  `;
    }
    
    shouldRefreshVerifierCred() {
        const now = new Date();
        return now > this.verifierCredExpirationWarningDate;
    }

    isVerifierCredExpired() {
        if (new Date() >= this.verifierCredExpiration) {
            // eslint-disable-next-line max-len
            const msg = `Verifier credential expired on ${this.verifierCredExpiration.toLocaleString()}.  Set a new verifier credential while connected to network to continue verifying credentials.  `;
            return new VerificationResult(false, msg);
        }
        return new VerificationResult(true, 'OK');
    }

    shouldRefreshCache() {
        const now = new Date();
        return now > this.cacheExpirationWarningDate
    }

    isCacheExpired() {
        if (new Date() >= this.cacheExpirationDate) {
            // eslint-disable-next-line max-len
            const msg = `Cache expired on ${this.cacheExpirationDate.toLocaleString()}.  Connect to network to refresh cache to continue verifying credentials.  `;
            return new VerificationResult(false, msg);
        }
        return new VerificationResult(true, 'OK');
    }

    // eslint-disable-next-line complexity
    async _processRequest(key, params, client, func, funcParams) {
        if (!this.realtime) {
            const foundResp = this._getCacheEntry(key);
            const found = foundResp.message;
            
            if (found) {
                return new VerificationResult(true, found);
            }
        }

        const tokenResponse = await this.getToken(params);
        if (!tokenResponse.success) {
            return tokenResponse;
        }
        const token = tokenResponse.message;

        const result = await func.bind(client, token, ...funcParams, params)();

        if (!result.success) {
            return result;
        }
        this._setCacheEntry(key, result.message, params);
        return result;
    }

    _getCacheEntry(key) {
        const found = this.cache.get(key);
        return new VerificationResult(true, found ? found.value : undefined);
    }

    _setCacheEntry(key, value, params) {
        const payload = {
            value,
            params
        }
        this.cache.set(key, payload);
    }
    
    _isTokenExpired(bearer) {
        const token = bearer.substr(bearer.indexOf(" ") + 1);
        const { exp } = jwt.decode(token);
        return Date.now() >= exp * 1000;
    }

    _getTokenRefreshMS(token) {
        const { exp } = jwt.decode(token);

        // expire cache 1 minute before token expiration to fall within cache check period
        const ttl = ((exp * 1000) - new Date().getTime()) - 60000;
        return ttl;
    }

    _initializeFromConfig(config, idAndVersion, params) {
        const nowMS = Date.now();

        const cacheRefreshMS = config.refresh * 1000;        
        const cacheRefreshWarnMS = cacheRefreshMS * CACHE_EXPIRATION_WARNING_PERCENT;
        this.cacheExpirationDate = new Date(nowMS + cacheRefreshMS);
        this.cacheExpirationWarningDate = new Date(nowMS + cacheRefreshWarnMS);
        
        const verifierCredDecoded = params.getVerifierCredentialDecoded();
        this.verifierCredExpiration = new Date(verifierCredDecoded.expirationDate);
        this.verifierCredExpirationWarningDate = new Date();

        const diffMS = this.verifierCredExpiration.getTime() - nowMS;
        const credRefreshWarnMS = diffMS * VERIFIER_CONFIG_EXPIRATION_WARNING_PERCENT;
        this.verifierCredExpirationWarningDate.setMilliseconds(credRefreshWarnMS);

        this.realtime = !config.offline;

        const tenMinutes = '*/10 * * * *';

        if (!this.realtime) {
            if (this.cacheRefreshTask) {
                this.cacheRefreshTask.stop();
                delete this.cacheRefreshTask;
            }
            this.cacheRefreshTask = cron.schedule(
                tenMinutes,
                this._cacheRefreshHandler(this, this.metering, params)
            );
            this.cacheRefreshTask.start();
        }

        if (verifierCredDecoded.credentialSubject.useAppId) {
            if (this.verifierConfigRefreshTask) {
                this.verifierConfigRefreshTask.stop();
                delete this.verifierConfigRefreshTask;
            }
            this.verifierConfigRefreshTask = cron.schedule(
                tenMinutes,
                this._verifierCredRefreshHandler(this, idAndVersion, params)
            );
            this.verifierConfigRefreshTask.start();
        }
    }

    _tokenRefreshHandler(cache, params) {
        const msg = 'Unable to refresh token';
        
        return async () => {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                // eslint-disable-next-line no-await-in-loop
                const getTokenResp = await cache.getToken(params, true);
                if (getTokenResp.success) {
                    break;
                }
                // eslint-disable-next-line no-console
                console.log(`${msg} :: ${getTokenResp.error || getTokenResp.message}`);  

                // eslint-disable-next-line no-await-in-loop
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }
    }

    _cacheRefreshHandler(cache, metering, params) {
        return async () => {
            if (!cache.shouldRefreshCache()) {
                return;
            }
     
            const msg = 'Unable to refresh cache';
            
            const meteringResp = await metering.postMeteringPayload(params);
            if (!meteringResp.success) {
                // eslint-disable-next-line no-console
                console.log(`${msg} :: ${meteringResp.error || meteringResp.message}`);  
                return
            }

            const preCacheResponse = await new PreCacheUtil(cache, params).preCache(false, true);
            if (preCacheResponse.success) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log(`${msg} :: ${preCacheResponse.error || preCacheResponse.message}`);  
        }
    }

    _verifierCredRefreshHandler(cache, idAndVersion, params) {
        return async () => {
            if (!cache.shouldRefreshVerifierCred()) {
                return;
            }

            const cred = params.getVerifierCredentialDecoded();

            const expirationDate = new Date();
            cred.expirationDate = expirationDate.setDate(expirationDate.getDate() + 1);

            // eslint-disable-next-line no-await-in-loop
            const configResp = await cache.getVerifierConfig(ISSUER_ID, idAndVersion, params, true);
            if (!configResp.success) {
                // eslint-disable-next-line no-console
                console.log(`Unable to refresh verifier credential :: ${configResp.error || configResp.message}`);  
            }
        }
    }
}

let instance;
// Pass metering to avoid circular dependency
const getCache = (metering) => {
    if (!instance) {
        instance = new Cache(metering);
    }
    return instance;
}

const clearInstance = () => {
    instance = undefined;
}

module.exports = { getCache, clearInstance };
