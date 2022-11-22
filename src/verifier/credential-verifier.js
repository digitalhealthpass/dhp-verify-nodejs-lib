/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const _ = require('lodash');

const VerificationResult = require('../utils/verification-result');
const VerifierPlugin = require('./verifier-plugin');
const { CRED_TYPE, ISSUER_ID } = require('../constants');
const getMetering = require('../utils/metering');
const { getCache } = require('../utils/cache');
const MetadataMapper = require('../utils/metadata-mapper');
const RulesVerifier = require('../utils/rules-verifier');

/**
 * Handles execution of all configured credential verifier plugins
 */
class CredentialVerifier {
    constructor(credentialVerifierParams) {
        this._params = credentialVerifierParams;
        this._rulesVerifier = new RulesVerifier();
    }

    /**
     * Launches all the configured credentila verifer plugins to verify a credential
     * @returns The credential verification success/failure result
     */
    async verify() {
        return this.procesCredential();
    }

    async extractCredential() {
        return this.procesCredential(true);
    }

    async procesCredential(skipVerification) {
        const plugins = this._getPlugins();

        if (plugins.length === 0) {
            throw new Error(`No verifier plugins are configured for verification`);
        }

        const extractResp = await this._extractCredential(plugins);
        if (!extractResp.success) {
            return extractResp;
        }

        const { plugin, credential, credType } = extractResp.message;

        if (skipVerification) {
            const cred = this._getCredFromRawCred(credential);
            return new VerificationResult(true, 'Credential Decoded', credType, cred);
        }

        const verifierConfigResp = await getCache().getVerifierConfig(
            ISSUER_ID, this._params.getVerifierCredentialDecoded().credentialSubject.configId, this._params
        );

        if (!verifierConfigResp.success) {
            return verifierConfigResp;
        }

        const verifierConfig = verifierConfigResp.message;

        if (!verifierConfig.deprecated) {
            const setSpecResp = await this._setSpecificationConfiguration(credential, credType, verifierConfig);
            if (!setSpecResp.success) {
                return this._incrementMetering(setSpecResp);
            }
        }

        const verifiyResp = await plugin.verify(credential, this._params);
        return this._incrementMetering(verifiyResp);
    }

    async _extractCredential(plugins) {
        let response;

        for (let i = 0; i < plugins.length; i += 1) {
            const plugin = plugins[i]
            // eslint-disable-next-line no-await-in-loop
            const extractResp = await plugin.decode(this._params);
            if (extractResp.success) {
                response = {
                    credential: extractResp.credential,
                    credType: extractResp.credType,
                    plugin
                };
                return new VerificationResult(true, response);
            }
            if (!extractResp.success && extractResp.message) {
                return extractResp;
            }
        }

        return new VerificationResult(false, 'Unknown Credential Type', CRED_TYPE.UNKNOWN);
    }

    async _setSpecificationConfiguration(credential, credType, verifierConfig) {
        const specConfig = await this._rulesVerifier.runClassifierRules(
            this._getCredFromRawCred(credential, credType), verifierConfig
        );
        if (!specConfig) {
            const spec = verifierConfig.specificationConfigurations.find(
                spec => spec.credentialSpec === CRED_TYPE.VC
            )
            || CRED_TYPE.UNKNOWN;

            this._params.setSpecificationConfiguration(spec);
            return new VerificationResult(false, 'Unknown Credential Type', CRED_TYPE.UNKNOWN, credential);
        }
        this._params.setSpecificationConfiguration(specConfig);

        return new VerificationResult(true, 'OK');
    }

    _getCredFromRawCred(credential, credType) {
        switch (credType) {
            case CRED_TYPE.DCC:
                return credential.credential;
            case CRED_TYPE.SHC:
                return credential.payload;
            default:
                return credential;
        }
    }

    // eslint-disable-next-line complexity
    async _incrementMetering(verifyResponse) {
        const response = _.cloneDeep(verifyResponse);

        const incrementResp = await getMetering().incrementMetering(
            ISSUER_ID,
            response.credential,
            response.credType,
            response.success ? 'Pass' : "Fail",
            this._params.getVerifierCredentialDecoded().credentialSubject.configId,
            this._params,
        );

        if (this._params.getReturnMetadata() && response.credType !== CRED_TYPE.UNKNOWN) {
            const metadataResp = await new MetadataMapper().getMetadata(
                response.credential,
                response.credType,
                this._params
            );

            response.metadata = metadataResp.message;
            if (metadataResp.warnings) {
                if (response.warnings) {
                    response.warnings.push(...metadataResp.warnings);
                } else {
                    response.warnings = metadataResp.warnings;
                }
            }
        }

        if (!this._params.getReturnCredential()) {
            delete response.credential;
        }

        if (!incrementResp.success) {
            return incrementResp;
        }

        const expiredResp = this._checkExpired();
        if (!expiredResp.success) {
            return expiredResp;
        }

        return this._addWarnings(response);
    }

    _checkExpired() {
        const verifierConfigExpiredResp = getCache().isVerifierCredExpired();
        if (!verifierConfigExpiredResp.success) {
            return verifierConfigExpiredResp;
        }

        return getCache().isCacheExpired();
    }

    _addWarnings(response) {
        const warnings = [];
        const cacheWarning = getCache().getCacheExpirationWarning();
        const configWarning = getCache().getConfigExpirationWarning();
        if (cacheWarning) {
            warnings.push(cacheWarning);
        }
        if (configWarning) {
            warnings.push(configWarning);
        }
        if (warnings.length > 0) {
            if (response.warnings) {
                response.warnings.push(...warnings)
            } else {
                response.warnings = warnings;
            }
        }
        return response;
    }


    /**
     * Gets all credential verifier plugs excluding disabled ones
     * @private
     * @returns credential verifier plugs
     */
    _getPlugins() {
        const plugins = [];
        const disabledPlugins = this._params.getDisabledPlugins() || [];
        this._params.getPlugins().forEach((plugin) => {
            if (!(plugin instanceof VerifierPlugin)) {
                throw new Error(`Verifier plugins must inherent from VerifierPlugin`);
            }
            if (!disabledPlugins.includes(plugin.getName())) {
                plugins.push(plugin);
            }
        });
        return plugins;
    }
}

module.exports = CredentialVerifier;
