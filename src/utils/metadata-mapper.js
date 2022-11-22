/* eslint-disable no-console */
/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const jp = require('jsonpath');
const { flatten } = require('safe-flat')

const { getCache } = require('./cache');
const { ISSUER_ID, CRED_TYPE } = require('../constants');
const VerificationResult = require('./verification-result');

class MetadataMapper {
    async getMetadata(cred, credType, params) {
        const mappingResponse = await this._getMetadataMapping(credType, params);
        if (!mappingResponse.success) {
            return mappingResponse
        }

        const mapping = mappingResponse.message;
        let mapped;

        const credential = credType === CRED_TYPE.OA
            ? this._sanitizeOACredential(JSON.parse(JSON.stringify(cred)))
            : cred;
        
        if (mapping.length > 0) {
            const lang = (params.getMetadataLanguage() || 'en').toLowerCase();
            mapped = this._mapFromMapping(credential, mapping, lang);
        } else {
            mapped = this._mapEverything(credential);
        }
        
        return new VerificationResult(true, mapped, credType, null, null, mappingResponse.warnings);
    }

    async _getMetadataMapping(credType, params) {
        const specConfig = params.getSpecificationConfiguration();
        if (specConfig) {
            const mapping = specConfig.display.reduce(
                (acc, displaySet) => {
                    acc.push(...displaySet.fields)
                    return acc;
                }, []
            );
            return new VerificationResult(true, mapping);
        }

        return getCache().getMetadataMapping(
            ISSUER_ID, credType, params.getVerifierCredentialDecoded().credentialSubject.configId, params
        );
    }

    _mapFromMapping(cred, mapping, lang) {
        return mapping.reduce((acc, item) => {
            if (item.field) {
                const extractedValue = jp.query(cred, `$.${item.field}`)[0] || undefined;

                if (extractedValue) {
                    const label = (item.displayValue && item.displayValue[lang])
                        ? item.displayValue[lang]
                        : item.field.split('.').reverse()[0];

                    const value = Array.isArray(extractedValue) ? extractedValue.join(' ') : extractedValue;
                    acc[label] = value;
                }
            }
            return acc;
        }, {});
    }

    _mapEverything(cred) {
        const flattened = flatten(cred);
        const mapped = {};
        const keys = Object.keys(flattened);
        keys.forEach(key => {
            mapped[key] = flattened[key];
        })
        return mapped;
    }

    _checkParams(cred, credType, params) {
        if (!cred) {
            throw new Error(`No credential object passed to getMetadata().`);
        }

        if (!credType) {
            throw new Error(`No credential type passed to getMetadata().`);
        }

        if (!params) {
            throw new Error(`params not passed to getMetadata().`);
        }
    }

    _sanitizeOACredential(credential) {
        const keys = Object.keys(credential);
        keys.forEach((k) => {
            const value = credential[k];
            if ((value instanceof Object)) {
                this._sanitizeOACredential(value)
            } else {
                const index = value.split(":").slice(0, 2).join(":").length;
                if (index === value.length) {
                    // eslint-disable-next-line no-param-reassign
                    credential[k] = value;
                } else {
                    // eslint-disable-next-line no-param-reassign
                    credential[k] = value.substring(index + 1, value.length);
                }
            }
        });
        return credential
    }
}

module.exports = MetadataMapper
