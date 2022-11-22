/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const jsonLogic = require('json-logic-js');
const moment = require('moment');

const VerificationResult = require('./verification-result');
const { getCache } = require("./cache");
const {
    ISSUER_ID,
    CRED_TYPE
} = require('../constants');

class RulesVerifier {
    constructor() {
        this._setupOperations();
    }

    async evaluateRules(credType, data, params) {
        const verifierConfigResp = await getCache().getVerifierConfig(
            ISSUER_ID, params.getVerifierCredentialDecoded().credentialSubject.configId, params
        );

        if (!verifierConfigResp.success) {
            return verifierConfigResp;
        }

        const verifierConfig = verifierConfigResp.message;

        if (verifierConfig.deprecated) {
            return this.evaluateRulesDeprecated(credType, data, params)
        }

        const payload = this._getPayload(data);

        const specConfig = params.getSpecificationConfiguration();

        payload.external = { ...payload.external, ...verifierConfig.valueSets };
        const rulesResp = this._runRules(specConfig.rules, payload, specConfig.credentialSpec);
        rulesResp.credentialCategory = specConfig.credentialCategory;
        return rulesResp;
    }

    async evaluateRulesDeprecated(credType, data, params) {
        const rulesResponse = await this._getRulesDeprecated(credType, params);

        if (!rulesResponse.success) {
            return rulesResponse;
        }

        const payload = this._getPayload(data)

        return this._runRules(rulesResponse.message, payload, credType);
    }

    runClassifierRules(credential, verifierConfig) {
        const payload = this._getPayload(credential);
        return verifierConfig.specificationConfigurations.find(
            specConfig => this._runRule(specConfig.classifierRule.predicate, payload) !== false
        );
    }

    async _getRulesDeprecated(credType, params) {
        return getCache().getRules(
            ISSUER_ID,
            credType,
            params.getVerifierCredentialDecoded().credentialSubject.configId,
            params
        );
    }

    _getPayload(data) {
        const credential = (typeof data === 'object')
            ? data
            : JSON.parse(data);

        const payload = (!credential.payload)
            ? {
                payload: credential
            }
            : credential;

        if (!payload.external || !payload.external.validationClock) {
            Object.assign(payload, {
                external: {
                    validationClock: moment().toISOString()
                }
            });
        }
        return payload;
    }

    _runRules(rules, payload, credType) {
        const failures = []

        let unknown = false;

        rules.forEach((rule) => {
            const result = this._runRule(rule.predicate, payload);
            if (!unknown) {
                unknown = result === 'unknown';
            };
            if (result === false) {
                failures.push(rule.id)
            }
        })

        if (unknown && credType !== CRED_TYPE.VC) {
            return this._runRules(rules, payload, CRED_TYPE.VC);
        }

        if (failures.length > 0) {
            const error = { configuration: { rules: failures } };

            return new VerificationResult(
                false, `Credential is not valid.  Failing rule id(s): ${failures}`, credType, null, error
            );
        }

        return new VerificationResult(true, 'Credential is valid', credType);
    }

    _runRule(rule, payload) {
        try {
            return jsonLogic.apply(JSON.parse(rule), payload);
        } catch (e) {
            return false;
        }
    }

    _setupOperations() {
        jsonLogic.add_operation("plusTime", (dateTimeStr, amount, unit) => {
            let dateTime;
            if (dateTimeStr === "now") {
                dateTime = new Date(Date.now());
            } else {
                dateTime = new Date(dateTimeStr)
            }

            const parsedAmount = (typeof amount === 'string')
                ? parseInt(amount, 10)
                : amount;

            if (unit === "day") {
                dateTime.setDate(dateTime.getDate() + parsedAmount)
            } else if (unit === "hour") {
                dateTime.setHours(dateTime.getHours() + parsedAmount)
            }
            return dateTime
        });

        jsonLogic.add_operation("before", (first, second, third) => {
            const firstOp = Date.parse(first);
            const secondOp = Date.parse(second);

            let result = firstOp < secondOp;

            if (third) {
                const thirdOp = Date.parse(third);
                result = result && secondOp < thirdOp;
            }

            return result;
        });

        jsonLogic.add_operation("not-before", (first, second, third) => {
            const firstOp = Date.parse(first);
            const secondOp = Date.parse(second);

            let result = firstOp >= secondOp;

            if (third) {
                const thirdOp = Date.parse(third);
                result = result && secondOp >= thirdOp;
            }

            return result;
        });

        jsonLogic.add_operation("after", (first, second, third) => {
            const firstOp = Date.parse(first);
            const secondOp = Date.parse(second);

            let result = firstOp > secondOp;

            if (third) {
                const thirdOp = Date.parse(third);
                result = result && secondOp > thirdOp;
            }

            return result;
        });

        jsonLogic.add_operation("not-after", (first, second, third) => {
            const firstOp = Date.parse(first);
            const secondOp = Date.parse(second);

            let result = firstOp <= secondOp;

            if (third) {
                const thirdOp = Date.parse(third);
                result = result && secondOp <= thirdOp;
            }

            return result;
        });

        jsonLogic.add_operation("lessThan", (first, second) => {
            const parse = (value) => {
                return (typeof value === 'string')? parseFloat(value) : value;
            }

            return parse(first) < parse(second);
        });
    }

    _toArray(values) {
        return Array.isArray(values)
            ? values
            : [values];
    }
}

module.exports = RulesVerifier;
