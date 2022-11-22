/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

// TODO: remove all xIssuerID from params since it now comes from a constant

const NodeCache = require("node-cache");
const AsyncLock = require('async-lock');
const jp = require('jsonpath');

const MeteringClient = require('../clients/metering-client');
const VerificationResult = require('./verification-result');
const { getCache } = require('./cache');

const {
    CACHE_TYPE,
    CACHE_CHECK_PERIOD,
    SCANS_BEFORE_SENDING_METERING,
    SECONDS_BEFORE_SENDING_METERING,
    RETRY_SECONDS_SENDING_METERING,
    CRED_TYPE,
} = require('../constants')

const SEND_METERING_KEY = `${CACHE_TYPE.METERING}::trigger`
const SHUT_DOWN_KEY = 'shutdown';

class Metering {
    constructor() {
        this.cache = new NodeCache({
            checkperiod: CACHE_CHECK_PERIOD,
            useClones: false,
        });

        this.refreshKeys = new Map();
        this.lock = new AsyncLock();

        this.meteringClient = new MeteringClient();
        this.scans = 0;
    }

    async incrementMetering(xIssuerID, cred, credType, scanResult, verifierConfigIdAndVersion, params) {
        const wrapperResp = await this._getMetricsWrapper(xIssuerID, verifierConfigIdAndVersion, params);
        if (!wrapperResp.success) {
            return wrapperResp;
        }

        const extractedResp = await this._extractFromJsonPath(
            xIssuerID, cred, credType, verifierConfigIdAndVersion, params
        );

        if (!extractedResp.success) {
            return extractedResp;
        }

        const wrapper = wrapperResp.message;
        const extracted = extractedResp.message;
        const key = `${CACHE_TYPE.METERING}::${wrapper.customerId}::${wrapper.orgId}`;

        const cacheFoundAndUpdated = this._updateCachedMetering(credType, scanResult, key, extracted, params);

        if (cacheFoundAndUpdated) {
            return new VerificationResult(true, 'OK');
        }

        const scan = this._createNewMeteringScan(credType, scanResult, extracted);
        wrapper.scans.push(scan);

        const payload = {
            value: wrapper,
            params
        }

        this.scans += 1;

        this.cache.set(key, payload, 0);
        this._setSendMeteringTrigger(params);
        return new VerificationResult(true, 'OK');
    }

    async postMeteringPayload(params, cacheSendTrigger = true) {
        const payload = [];
        const keys = this.cache.keys();
        keys.forEach(k => {
            if (k !== SEND_METERING_KEY) {
                payload.push(this.cache.get(k).value);
            }
        })

        if (payload.length === 0) {
            this.refreshKeys.set(SEND_METERING_KEY, false);
            return new VerificationResult(true, 'OK');
        }

        const tokenResp = await getCache().getToken(params);
        if (!tokenResp.success) {
            this.refreshKeys.set(SEND_METERING_KEY, false);
            return tokenResp;
        }

        const response = await this.meteringClient.postMetering(tokenResp.message, payload, params);
        if (response.success) {
            this.scans = 0;
            this.cache.del(keys);
            this.refreshKeys.set(SEND_METERING_KEY, false);
            return response;
        }

        if (cacheSendTrigger) {
            this.cache.set(SEND_METERING_KEY, { params }, RETRY_SECONDS_SENDING_METERING);
        }
        
        this.refreshKeys.set(SEND_METERING_KEY, false);
        return response;
    }

    async _postMeteringPayloadOnSIGINT() {
        const shouldRefresh = await this._setRefreshKeys(SHUT_DOWN_KEY)
        if (!shouldRefresh) {
            return;
        }

        // eslint-disable-next-line no-constant-condition
        while (true) {
            this._setRefreshKeys(SEND_METERING_KEY)
            const cacheHit = this.cache.get(SEND_METERING_KEY);
            if (!cacheHit) {
                // eslint-disable-next-line no-process-exit
                process.exit()
            }
    
            // eslint-disable-next-line no-await-in-loop
            const postResp = await this.postMeteringPayload(cacheHit.params, false);
    
            if (!postResp.success) {
                // eslint-disable-next-line no-console
                console.log(
                    `Unable to finalize sending data.  Retry in ${RETRY_SECONDS_SENDING_METERING} seconds: ${
                        postResp.message
                    }`
                );
                // eslint-disable-next-line no-await-in-loop
                await new Promise(resolve => setTimeout(resolve, RETRY_SECONDS_SENDING_METERING * 1000));
            } else {
                // eslint-disable-next-line no-process-exit
                process.exit()
            }
        }
    }

    async _extractFromJsonPath(xIssuerID, cred, credType, verifierConfigIdAndVersion, params) {
        // If custom plugin or unknown cred type then use VC for metering
        const credentialType = Object.keys(CRED_TYPE).includes(credType) && credType !== CRED_TYPE.UNKNOWN
            ? credType
            : CRED_TYPE.VC;

        const configResp = await this._getMeteringConfig(xIssuerID, credentialType, verifierConfigIdAndVersion, params);
        if (!configResp.success) {
            return configResp;
        }

        const config = configResp.message.extract;

        const extracted = new Map();
        const keys = Object.keys(config);
        // custom pluging may not return cred.  Skip this if undefined.
        // Also skip for unknown cred type
        if (cred && Object.keys(CRED_TYPE).includes(credType) && credType !== CRED_TYPE.UNKNOWN) {
            try {
                keys.forEach(k => {
                    const value = jp.query(cred, `$.${config[k]}`)[0] || undefined;
                    if (value) {
                        extracted.set(k, value);
                    }
                });
            } catch (error) {
                return new VerificationResult(
                    false, `Error with metering config: ${error.message}`
                );
            }
        }
        return new VerificationResult(true, extracted);
    }

    async _getMeteringConfig(xIssuerID, credType, verifierConfigIdAndVersion, params) {
        const specConfig = params.getSpecificationConfiguration();
        if (specConfig) {
            if (specConfig === CRED_TYPE.UNKNOWN) {
                // VC spec was not found in the config, so we cannot bill
                return new VerificationResult(false, 'Unknown Credential Type', CRED_TYPE.UNKNOWN);
            }

            return new VerificationResult(true, specConfig.metrics[0]);
        }
        const configResult = await getCache().getVerifierConfig(
            xIssuerID,
            verifierConfigIdAndVersion,
            params);

        if (!configResult.success) {
            return configResult;
        }

        const config = configResult.message;

        if (!config.configuration[credType]) {
            return new VerificationResult(false, `Metering config not found for ${credType}`);
        }

        const results = new VerificationResult(true, config.configuration[credType].metrics[0]);

        return results;
    }

    _createNewMeteringScan(credType, scanResult, extracted) {
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        const scan = {
            datetime: now.toISOString(),
            scanResult,
            credentialSpec: credType,
            total: 1,
        }
        
        extracted.forEach((v, k) => {
            scan[k] = v;
        });
        return scan;
    }

    _updateCachedMetering(credType, scanResult, key, extracted, params) {
        const cacheHit = this.cache.get(key);
        if (!cacheHit) {
            return false;
        }

        const scan = cacheHit.value.scans.find((s) => {
            let found = s.scanResult === scanResult
                && s.credentialSpec === credType;
            if (!found) { return false };

            extracted.forEach((v, k) => {
                if (found) {
                    found = s[k] === v;
                };
            });
            return found;
        });

        if (scan) {
            const now = new Date();
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            scan.datetime = now.toISOString();
            scan.total += 1;
        } else {
            const newScan = this._createNewMeteringScan(credType, scanResult, extracted);
            cacheHit.value.scans.push(newScan);
        }

        this.cache.set(key, cacheHit, 0);

        this.scans += 1;

        if (this.scans === SCANS_BEFORE_SENDING_METERING) {
            this.postMeteringPayload(params);
            return true;
        }

        return true;
    }

    _setSendMeteringTrigger(params) {
        const cacheHit = this.cache.get(SEND_METERING_KEY);
        if (cacheHit) {
            return;
        }
        this.cache.set(SEND_METERING_KEY, { params }, SECONDS_BEFORE_SENDING_METERING);
    }

    async _getMetricsWrapper(xIssuerID, verifierConfigId, params) {
        const configResult = await getCache().getVerifierConfig(
            xIssuerID,
            verifierConfigId,
            params);

        if (!configResult.success) {
            return configResult;
        }

        const config = configResult.message;

        const cred = params.getVerifierCredentialDecoded();

        const wrapper =                 {
            customerId: config.customerId || cred.credentialSubject.customerId,
            orgId: cred.credentialSubject.organizationId ||  config.organizationId,
            verDID: cred.id,
            scans: [],
        };
        return new VerificationResult(true, wrapper);
    }

    async _handleExpiredCache(key, payload) {
        const shouldRefresh = await this._setRefreshKeys(key)
        if (!shouldRefresh) {
            return;
        }

        if (key === SEND_METERING_KEY) {
            this.postMeteringPayload(payload.params);
        } else {
            throw new Error(`Error: Unknown cache type ${key}`);
        }
    }

    // Needed because node-cache can fire multiple expire events for the same key
    async _setRefreshKeys(key) {
        let result;
        await this.lock.acquire("key1", (done) => {
            if (!this.refreshKeys.has(key)) {
                this.refreshKeys.set(key, true);
                result = true;
            } else if (this.refreshKeys.get(key)) {
                result = false;
            } else {
                this.refreshKeys.set(key, true);
                result = true;
            }
            done();
        }, () => { }, {});
        return result
    }
}

let instance;
const getMetering = () => {
    if (!instance) {
        instance = new Metering();
    }
    return instance;
}

process.on('SIGINT', () => {
    getMetering()._postMeteringPayloadOnSIGINT();
});

module.exports = getMetering;
