/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/**
 * Parameters set by CredentialVerifierBuilder that will be
 * used by credential verifier plugins during credential verification
 */
class CredentialVerifierParams {
    /**
     * 
     * @param {Array<VerifierPlugin>} plugins Credential verifier plugins used to validate the credential
     * @param {Object|string} credential The credential to be validated
     */
    constructor(plugins) {
        this.plugins = plugins;
        this.returnCredential = false;
        this.returnMetadata = false;
        this.metadataLanguage = 'en';
    }

    /**
     * Sets the Healthpass Host URL
     * @param {string} healthpassHostUrl 
     * @returns {CredentialVerifierBuilder} this
     */
    setHealthpassHostUrl(healthpassHostUrl) {
        this.healthpassHostUrl = healthpassHostUrl;
    }

    /**
     * 
     * @returns Gets the Healthpass Host URL
     */
    getIssuerHostUrl() {
        return this.healthpassHostUrl;
    }

    /**
     * 
     * @param {Array<VerifierPlugin>|VerifierPlugin} plugins Sets credential verifier plugins
     */
    setPlugins(plugins) {
        this.plugins = plugins
    }

    /**
     * 
     * @returns {Array<VerifierPlugin>|VerifierPlugin} Gets credential verifier plugins
     */
    getPlugins() {
        return this.plugins;
    }

    /**
     * Sets the name(s) of disabled credential verifier plugins
     * that will not be executed during credential verification
     * @param {Array<string>|string} disabledPlugins 
     */
    setDisabledPlugins(disabledPlugins) {
        this.disabledPlugins = disabledPlugins;
    }

    /**
     * Gets the name(s) of disabled credential verifier plugins
     * that will not be executed during credential verification
     * @returns {Array<string>|string} The disabled plugins
     */
    getDisabledPlugins() {
        return this.disabledPlugins;
    }

    /**
     * Sets the credential to be verified
     * @param {Object|string} credential 
     */
    setCredential(credential) {
        this.credential = credential;
    }

    setVerifierCredential(verifierCredential) {
        this.verifierCredential = verifierCredential;
    }

    getVerifierCredential() {
        return this.verifierCredential;
    }

    setVerifierCredentialDecoded(verifierCredential) {
        this.verifierCredentialDecoded = verifierCredential;
    }

    getVerifierCredentialDecoded() {
        return this.verifierCredentialDecoded;
    }

    /**
     * 
     * @returns {Object|string} Returns the credential to be validated
     */
    getCredential() {
        return this.credential;
    }

    /**
     * Sets if a successful validation will return the credential in the payload
     * False by default
     * @param {boolean} returnCredential
     */
    setReturnCredential(returnCredential) {
        this.returnCredential = returnCredential;
    }

    /**
     * Gets if a successful validation will return the credential in the payload
     * False by default
     * @returns {boolean}
     */
    getReturnCredential() {
        return this.returnCredential;
    }

    /**
     * Sets if a successful validation will return the credential metadata in the payload
     * False by default
     * @param {boolean} returnMetadata
     */
    setReturnMetadata(returnMetadata) {
        this.returnMetadata = returnMetadata;
    }

    /**
     * Gets if a successful validation will return the credential metadata in the payload
     * False by default
     * @returns {boolean}
     */
    getReturnMetadata() {
        return this.returnMetadata;
    }

    /**
     * Sets the two letter country code for the language for the keys in the metadata returned
     * in the VerificationResult
     * @param {string} metadataLanguage
     */
    setMetadataLanguage(metadataLanguage) {
        this.metadataLanguage = metadataLanguage;
    }

    /**
     * Returns the two letter country code for the language for the keys in the metadata returned
     * in the VerificationResult
     * @returns {string} metadataLanguage
     */
    getMetadataLanguage() {
        return this.metadataLanguage;
    }

    /**
     * This can be anything that is needed by a custom credential verifier plugin
     * @param {any} extras
     */
    setExtras(extras) {
        this.extras = extras;
    }

    /**
     * Returns the "extra" parameters used by a custom credential verifier plugin
     * @returns {any}
     */
    getExtras() {
        return this.extras;
    }

    setSpecificationConfiguration(specificationConfiguration) {
        this.specificationConfiguration = specificationConfiguration;
    }

    getSpecificationConfiguration() {
        return this.specificationConfiguration;
    }
}

module.exports = CredentialVerifierParams;
