/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */


const { getPlugins, initPlugins } = require('../utils/verifier-utils');
const CredentialVerifierParams = require('./credential-verifier-params');
const CredentialVerifier = require('./credential-verifier');
const { getCache, clearInstance } = require('../utils/cache');
const PreCacheUtil = require('../utils/pre-cache-util');
const VerifierConfigClient = require('../clients/verifier-config-client');
const MeteringClient = require('../clients/metering-client');

const { ISSUER_ID } = require('../constants');
const VerificationResult = require('../utils/verification-result');
const getMetering = require('../utils/metering');

const toArray = (values) => {
    return Array.isArray(values)
        ? values
        : [values];
}
const verifierConfigClient = new VerifierConfigClient();
const meteringClient = new MeteringClient();

/**
 * A builder that configures, instantiates, and returns a CredentialVerifier
 */
class CredentialVerifierBuilder {
    /**
     * The credential to be verified
     * @param {String|Object} credential The credential to be verified
     */
    constructor() {
        const plugins = getPlugins();
        if (plugins.length === 0) {
            initPlugins();
        }
        this._params = new CredentialVerifierParams(
            plugins
        );

        // initialize cache with metering to avoid circular dependency
        getCache(getMetering());
    }

    async init() {
        this._verifyUrlParams();
        this._verifyPlugins();
        this._verifyVerifierCredential();

        clearInstance();
        const tokenResponse = await getCache(getMetering()).getToken(this._params);
        if (!tokenResponse.success) {
            return tokenResponse;
        }
        const token = tokenResponse.message;

        const configResponse = await verifierConfigClient.getVerifierConfigurationPartial(
            token,
            ISSUER_ID,
            this._params.getVerifierCredentialDecoded().credentialSubject.configId,
            this._params,
        );

        if (!configResponse.success) {
            return configResponse;
        }

        const preCacheResponse = await new PreCacheUtil(getCache(getMetering()), this._params).preCache(
            !this.initialized, configResponse.message.offline
        );
        if (!preCacheResponse.success) {
            return preCacheResponse;
        }

        const healthResponse = await meteringClient.getHealth(token, this._params);
        if (!healthResponse.success) {
            return healthResponse;
        }

        this.initialized = true;
        return new VerificationResult(true, 'Builder successfully initialized');
    }

    /**
     * Sets the Healthpass API URL
     * @param {string} healthpassApiUrl 
     * @returns {CredentialVerifierBuilder} this
     */
    setHealthpassHostUrl(healthpassHostUrl) {
        this._params.setHealthpassHostUrl(healthpassHostUrl);
        return this;
    }

    /**
     * Sets the credential to be verified
     * @param {Object|string} credential 
     * @returns {CredentialVerifierBuilder} this
     */
    setCredential(credential) {
        this._params.setCredential(
            this._stringToJson(credential)
        );
        return this;
    }

    setVerifierCredential(verifierCredential) {
        const { decoded, encoded } = this._decodeVerifierCredential(verifierCredential);

        this._params.setVerifierCredentialDecoded(decoded);
        this._params.setVerifierCredential(encoded);

        return this;
    }

    _decodeVerifierCredential(cred) {
        const payload = {
            decoded: cred,
            encoded: cred
        }
        try {
            payload.decoded = JSON.parse(cred);
            payload.encoded = Buffer.from(cred).toString('base64');
        } catch {
            try {
                payload.decoded = JSON.parse(Buffer.from(cred, 'base64').toString());
            // eslint-disable-next-line no-empty
            } catch {}
        }
        return payload;
    }

    /**
     * @param {Array<VerifierPlugin>|VerifierPlugin} additionalPlugins Set custom credential
     * verifier plugins not provided by the library
     * @returns {CredentialVerifierBuilder} this
     */
    setAdditionalPlugins(additionalPlugins) {
        const existingPlugins = this._params.getPlugins();
        const plugins = existingPlugins.concat(toArray(additionalPlugins).reduce(
            (acc, Plugin) => {
                acc.push(new Plugin())
                return acc;
            },
            []
        ));

        this._params.setPlugins(plugins);
        return this;
    }

    /**
     * Sets the name(s) of disabled credential verifier plugins
     * that will not be executed during credential verification
     * @param {Array<string>|string} disabledPlugins 
     * @returns {CredentialVerifierBuilder} this
     */
    setDisabledPlugins(disabledPlugins) {
        this._params.setDisabledPlugins(toArray(disabledPlugins));
        return this;
    }

    /**
     * Sets if a successful validation will return the credential in the payload
     * False by default
     * @param {boolean} returnCredential
     * @returns {CredentialVerifierBuilder} this
    */
    setReturnCredential(returnCredential) {
        this._params.setReturnCredential(returnCredential);
        return this;
    }

    /**
     * Sets if a successful validation will return the credential metadata in the payload
     * False by default
     * @param {boolean} returnMetadata
     */
    setReturnMetadata(returnMetadata) {
        this._params.setReturnMetadata(returnMetadata);
        return this;
    }

    /**
     * Sets the two letter country code for the language for the keys in the metadata returned
     * in the VerificationResult
     * @param {string} metadataLanguage
     */
    setMetadataLanguage(metadataLanguage) {
        this._params.setMetadataLanguage(metadataLanguage);
        return this;
    }

    /**
     * This can be anything that is needed by a custom credential verifier plugin
     * @param {any} extras 
     * @returns {CredentialVerifierBuilder} this
     */
    setExtras(extras) {
        this._params.setExtras(extras);
        return this;
    }

    /**
     * Returns the full verifier configuration
     * @returns {string}
     */
    async getVerifierConfiguration() {
        const cred = this._params.getVerifierCredentialDecoded();
        if (!cred) {
            return undefined;
        }
        this._verifyVerifierCredentialDecoded();
        return getCache(getMetering()).getVerifierConfig(
            ISSUER_ID, cred.credentialSubject.configId, this._params
        );
    }

    getParams() {
        return this._params;
    }

    /**
     * Instantiates and returns a CredentialVerifier.
     * Throws and error if no plugins are configured
     * @returns {CredentialVerifier} The credential verifier
     */
    build() {
        if (!this.initialized === true) {
            throw new Error(
                'init() must be called at least once on the builder instance before building verifiers'
            );
        }

        this._verifyUrlParams();
        this._verifyCredentialParam();
        this._verifyPlugins();

        return new CredentialVerifier(this._params);
    }

    _verifyUrlParams() {
        if (!process.env.ISSUER_API
                || !process.env.METERING_API
                || !process.env.VERIFIER_CONFIG_API) {
            if (!this._params.getIssuerHostUrl()) {
                throw new Error('Healthpass Host URL must be set');
            }
        }
    }

    _verifyCredentialParam() {
        if (!this._params.getCredential()) {
            throw new Error(`A credential must be supplied`);
        }
    }

    _validAppIdConfig() {
        return process.env.APP_ID_URL &&
            process.env.APP_ID_CLIENT_ID &&
            process.env.APP_ID_SECRET &&
            process.env.VERIFIER_CONFIG_ID;
    };


    _verifyVerifierCredentialDecoded() {
        const decoded = this._params.getVerifierCredentialDecoded();

        if (!decoded.credentialSubject) {
            throw new Error(`Invalid verifier credential.  Missing credentialSubject`);
        }
        if (!decoded.credentialSubject.configId) {
            throw new Error(`Invalid verifier credential.  Missing credentialSubject.configId`);
        }
        if (!decoded.credentialSubject.customerId && !decoded.credentialSubject.useAppId) {
            throw new Error(`Invalid verifier credential.  Missing credentialSubject.customerId`);
        }
        if (!decoded.credentialSubject.organizationId) {
            throw new Error(`Invalid verifier credential.  Missing credentialSubject.organizationId`);
        }
    }

    _verifyVerifierCredential() {
        if (!this._params.getVerifierCredential()) {
            throw new Error(`A verifier credential must be supplied`);
        }

        const cred = this._params.getVerifierCredentialDecoded();

        this._verifyVerifierCredentialDecoded();

        if (cred.credentialSubject.useAppId === true) {
            if (!this._validAppIdConfig()) {
                throw new Error(`App ID is not configured properly`);   
            }
            if (!cred.id || !cred.credentialSubject.configId) {
                throw new Error(`Verifier credential is missing id`);
            }
            if (!cred.credentialSubject.configId) {
                throw new Error(`Verifier credential is missing configId`);
            }

            const expirationDate = new Date();
            cred.expirationDate = expirationDate.setDate(expirationDate.getDate() + 1);
        }
    }

    _verifyPlugins() {
        if (getPlugins().length === 0) {
            throw new Error(`No verifier plugins found`);
        }
    }

    /**
     * Attempts to parse a JSON credential 
     * @private
     * @param {String|Object} cred A credential
     * @returns {Object|string} A parsed JSON credential.
     * If not JSON then returns the string credential
     */
    _stringToJson(cred) {
        if (typeof cred === 'string') {
            try {
                return JSON.parse(cred)
            } catch (e) {
                return cred;
            }
        }
        return cred;
    }
}

module.exports = CredentialVerifierBuilder;
