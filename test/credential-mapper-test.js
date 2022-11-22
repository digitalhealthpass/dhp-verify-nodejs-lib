/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

const { expect } = require('chai');
const nock = require('nock');

const credentialTestIDHP = require('../testdata/IDHP.test.json')
const credentialTestGHP = require('../testdata/GHP.test.json')
const credentialTestSHC = require('../testdata/SHC.test.json')
const credentialVaccineIDHP = require('../testdata/IDHP.vaccine.json')
const credentialVaccineGHP = require('../testdata/GHP.vaccine.json')
const credentialVaccineSHC = require('../testdata/SHC.vaccine.json')

const payloadFactory = require('./payload-factory')
const MetadatalMapper = require('../src/utils/metadata-mapper');
const CredentialVerifierParams = require('../src/verifier/credential-verifier-params')


const {
    ISSUER_PATH,
    VERIFIER_CONFIG_PATH,
} = require('../src/constants');

const healthpassHost = 'http://localhost:3010';

const verifyConfigId = '3e9b52cb-3177-4957-ab82-0384090637f6';

describe('MetadatalMapper', () => {
    const mapper = new MetadatalMapper();

    const params = new CredentialVerifierParams();

    params.setVerifierCredential({
        credentialSubject: {
            configId: verifyConfigId
        }
    });
    params.setVerifierCredentialDecoded({
        credentialSubject: {
            configId: verifyConfigId
        }
    });
    params.setHealthpassHostUrl(healthpassHost);

    const setupVerifierConfigNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .get(`${VERIFIER_CONFIG_PATH}/verifier-configurations/content`)
            .query({
                id: verifyConfigId,
                version: 'latest'
            })
            .reply(200, payloadFactory.getVerifierConfigPayloadDeprecated);
    }

    const setupTokenNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .post(`${ISSUER_PATH}/users/loginWithCredential`,
                {
                    credential: {
                        credentialSubject: {
                            configId: verifyConfigId
                        }
                    }
                })
            .reply(200, {
                access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6IjIwNDEtMDktMDJUMTg6NDY6MTcuNTA0WiIsImlhdCI6MTYzMDYwODM3N30.1FygBH5aWO4xBi9F2UQcbj_FuEwpig5gAnW5hYeLfwo'
            });
    }

    beforeEach(() => {
        nock.cleanAll();
        setupVerifierConfigNock();
        setupTokenNock();
    });

    describe('with valid IBM test credentials', () => {
        const credentialType = "IDHP";
        const credential = credentialTestIDHP;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("givenName");
                expect(keys[1]).to.equal("familyName");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("Jane");
                expect(response.message[keys[1]]).to.equal("Smith");
                expect(response.message[keys[2]]).to.equal("2000-10-10");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid IBM vaccine credentials', () => {
        const credentialType = "IDHP";
        const credential = credentialVaccineIDHP;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("givenName");
                expect(keys[1]).to.equal("familyName");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("Jane");
                expect(response.message[keys[1]]).to.equal("Smith");
                expect(response.message[keys[2]]).to.equal("2000-10-10");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid GHP test credentials', () => {
        const credentialType = "GHP";
        const credential = credentialTestGHP;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("givenName");
                expect(keys[1]).to.equal("familyName");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("Jane");
                expect(response.message[keys[1]]).to.equal("Smith");
                expect(response.message[keys[2]]).to.equal("2000-10-10");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid GHP vaccine credentials', () => {
        const credentialType = "GHP";
        const credential = credentialVaccineGHP;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("givenName");
                expect(keys[1]).to.equal("familyName");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("Jane");
                expect(response.message[keys[1]]).to.equal("Smith");
                expect(response.message[keys[2]]).to.equal("2000-10-10");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid SHC test credentials', () => {
        const credentialType = "SHC";
        const credential = credentialTestSHC;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("given");
                expect(keys[1]).to.equal("family");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("John B.");
                expect(response.message[keys[1]]).to.equal("Anyperson");
                expect(response.message[keys[2]]).to.equal("1951-01-20");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid SHC vaccine credentials', () => {
        const credentialType = "SHC";
        const credential = credentialVaccineSHC;

        it('extracts mapped credentials labels in English', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if not specifid', (done) => {           
            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("First Name");
                expect(keys[1]).to.equal("Surname");
                expect(keys[2]).to.equal("Date of Birth");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in English if translation not found', (done) => {
            params.setMetadataLanguage("xx");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("given");
                expect(keys[1]).to.equal("family");
                expect(keys[2]).to.equal("birthDate");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials labels in German', (done) => {
            params.setMetadataLanguage("de");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(keys[0]).to.equal("Vorname");
                expect(keys[1]).to.equal("Nachname");
                expect(keys[2]).to.equal("Geburtsdatum");
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('extracts mapped credentials values correctly', (done) => {
            params.setMetadataLanguage("en");

            mapper.getMetadata(credential, credentialType, params).then(response => {
                const keys = Object.keys(response.message);
                expect(response.message[keys[0]]).to.equal("John B.");
                expect(response.message[keys[1]]).to.equal("Anyperson");
                expect(response.message[keys[2]]).to.equal("1951-01-20");
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('with valid DCC test credentials', () => {

    });

    describe('with valid DCC vaccine credentials', () => {

    });

});
