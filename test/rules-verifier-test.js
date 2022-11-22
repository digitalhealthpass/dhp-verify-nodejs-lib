/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const chai = require('chai');
const sinon = require("sinon");
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

const RulesVerifier = require('../src/utils/rules-verifier');
const ibmRules = require('./resources/rules/IBM.json');
const vciRules = require('./resources/rules/VCI.json');
const euRules = require('./resources/rules/DCC.json');
const ghpRules = require('./resources/rules/GHP.json');
const VerificationResult = require('../src/utils/verification-result');
const CredentialVerifierParams = require('../src/verifier/credential-verifier-params')
const payloadFactory = require('./payload-factory')
const { CRED_TYPE, VERIFIER_CONFIG_PATH, ISSUER_PATH } = require('../src/constants')

chai.use(chaiAsPromised);
const { expect } = chai;

const ghpCred = {
    "payload": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "credentialSchema": {
            "id": "did:hpass:19b0cf0d5fc7017dd66ddd2374fbd9b796d988aced083d709abbaa0f7480b474:c4d1492e81bfcb951d028c0a4bd3c1edec16d32aed77a608c76ed917f3231f7e;id=ghp-vaccination-credential;version=0.4",
            "type": "JsonSchemaValidator2018"
        },
        "credentialSubject": {
            "batchNumber": "12345",
            "countryOfVaccination": "us",
            "dateOfVaccination": "2020-12-30",
            "disease": "COVID-19",
            "display": "#32CD32",
            "doseNumber": 2,
            "dosesPerCycle": 2,
            "marketingAuthorizationHolder": "PFizer-Biontech",
            "medicinalProductCode": "212",
            "medicinalProductName": "Comirnaty",
            "recipient": {
                "birthDate": "2000-10-10",
                "familyName": "Smith",
                "givenName": "Jane",
                "middleName": "Sarah"
            },
            "stateOfVaccination": "ca",
            "type": "Vaccination Card",
            "vaccineType": "208"
        },
        "expirationDate": "2021-12-31T00:00:00Z",
        "id": "did:hpass:19b0cf0d5fc7017dd66ddd2374fbd9b796d988aced083d709abbaa0f7480b474:c4d1492e81bfcb951d028c0a4bd3c1edec16d32aed77a608c76ed917f3231f7e#vc-28b49427-85d1-4d20-a5ec-0440c2c3253e",
        "issuanceDate": "2021-07-22T12:11:46Z",
        "issuer": "did:hpass:19b0cf0d5fc7017dd66ddd2374fbd9b796d988aced083d709abbaa0f7480b474:c4d1492e81bfcb951d028c0a4bd3c1edec16d32aed77a608c76ed917f3231f7e",
        "proof": {
            "created": "2021-07-22T12:11:46Z",
            "creator": "did:hpass:19b0cf0d5fc7017dd66ddd2374fbd9b796d988aced083d709abbaa0f7480b474:c4d1492e81bfcb951d028c0a4bd3c1edec16d32aed77a608c76ed917f3231f7e#key-1",
            "nonce": "4a7caa98-bdd5-444c-9ea9-9ff152bfcf69",
            "signatureValue": "MEUCIQD-uezlnvuoIw2QoPIYgLfcp5fTsV9JKUYOW27PbzytUAIgZcqbCiiVHaUvW-IhD2gGUt1WthiVpzaqOWz6OWQ_A1k",
            "type": "EcdsaSecp256r1Signature2019"
        },
        "type": [
            "VerifiableCredential",
            "GoodHealthPass",
            "VaccinationCredential"
        ]
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
}

const ibmCred = {
    "payload": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-d8ae9341-699c-47f0-90f9-c85f14d68b74",
        "type": [
            "VerifiableCredential",
            "IBMDigitalHealthPass",
            "Vaccination"
        ],
        "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
        "issuanceDate": "2021-09-10T19:43:28Z",
        "credentialSchema": {
            "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=ghp-vaccination-credential;version=0.6",
            "type": "JsonSchemaValidator2018"
        },
        "credentialSubject": {
            "batchNumber": "12345",
            "countryOfVaccination": "US",
            "dateOfVaccination": "2020-12-30",
            "disease": "COVID-19",
            "display": "#32CD32",
            "doseNumber": 2,
            "dosesPerCycle": 2,
            "marketingAuthorizationHolder": "PFizer-Biontech",
            "medicinalProductCode": "212",
            "medicinalProductName": "Comirnaty",
            "recipient": {
                "birthDate": "2000-10-10",
                "familyName": "Smith",
                "givenName": "Jane",
                "middleName": "Sarah"
            },
            "sourceOfData": "Paper CDC Card",
            "stateOfVaccination": "CA",
            "type": "Vaccination Card",
            "vaccineType": "208"
        },
        "proof": {
            "created": "2021-09-10T19:43:28Z",
            "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
            "nonce": "caef620e-b8be-4ba3-8488-15c048787ec3",
            "signatureValue": "MEQCIE7nkuo-JXiSK-HWgcvx3soyMp7VbsedQ5iUH_mMt_3_AiBoLj5iSQO92FMnqs_tuOMJE4vX0-PT5I4_IKKFDDzfXg",
            "type": "EcdsaSecp256r1Signature2019"
        }
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
}

const vciCred = {
    "payload": {
        "iss": "URI",
        "vc": {
            "type": [
                "https://smarthealth.cards#health-card",
                "https://smarthealth.cards#laboratory"
            ],
            "credentialSubject": {
                "fhirBundle": {
                    "entry": [
                        {
                            "fullUrl": "resource:0",
                            "resource": {
                                "name": [
                                    {
                                        "family": "Anyperson",
                                        "given": ["John", "B."]
                                    }
                                ],
                                "birthDate": "1951-01-20"
                            }
                        },
                        {
                            "fullUrl": "resource:1",
                            "resource": {
                                "code": {
                                    "coding": [
                                        {
                                            "system": "http://loinc.org",
                                            "code": "94558-4"
                                        }
                                    ]
                                },
                                "effectiveDateTime": "2021-06-27",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "http://snomed.info/sct",
                                            "code": "260415000"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
}

const dccRecoveryCred = {
    "payload": {
        "r": [
            {
                "ci": "URN:UVCI:01DE/5CWLU12RNOB9RXSEOP6FG8#W",
                "co": "DE",
                "df": "2021-05-29",
                "du": "2022-06-15",
                "fr": "2021-01-10",
                "is": "Robert Koch-Institut",
                "tg": "840539006"
            }
        ]
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
};

const dccTestCred = {
    "payload": {
        "t": [
            {
                "ci": "URN:UVCI:01DE/IZ12345A/5CWLU12RNOB9RXSEOP6FG8#W",
                "co": "DE",
                "dr": "2021-06-27T12:00:00Z",
                "is": "Robert Koch-Institut",
                "sc": "2021-06-27T00:00:00Z",
                "tc": "Testzentrum K\u00f6ln Hbf",
                "tg": "840539006",
                "tr": "260415000",
                "tt": "LP217198-3"
            }
        ]
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
};

const dccVaccineCred = {
    "payload": {
        "dob": "1964-08-12",
        "nam": {
            "fn": "Mustermann",
            "fnt": "MUSTERMANN",
            "gn": "Erika",
            "gnt": "ERIKA"
        },
        "v": [
            {
                "ci": "URN:UVCI:01DE/IZ12345A/5CWLU12RNOB9RXSEOP6FG8#W",
                "co": "DE",
                "dn": 2,
                "dt": "2021-05-29",
                "is": "Robert Koch-Institut",
                "ma": "ORG-100031184",
                "mp": "EU/1/20/1507",
                "sd": 2,
                "tg": "840539006",
                "vp": "1119349007"
            }
        ],
        "ver": "1.0.0"
    },
    "external": {
        "validationClock": "2021-06-28T00:00:00.000Z"
    }
};

const verifier = new RulesVerifier();

const sandbox = sinon.createSandbox();
const getRulesStub = sandbox.stub(verifier, '_getRulesDeprecated');

const params = new CredentialVerifierParams();

const healthpassHost = 'http://localhost:3010';
const verifyConfigId = '3e9b52cb-3177-4957-ab82-0384090637f6';

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

afterEach(() => {
    sandbox.reset();
});

after(() => {
    sandbox.restore();
});

describe('evaluate IBM rules', () => {
    it('with good cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, ibmRules));
        verifier.evaluateRules(CRED_TYPE.IDHP, ibmCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.IDHP)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
    it('with expired cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, ibmRules));
        ibmCred.external.validationClock = '2022-07-06T21:21:00Z';
        verifier.evaluateRules(CRED_TYPE.IDHP, ibmCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(
                        false,
                        'Credential is not valid.  Failing rule id(s): e4cc69fc-d18c-4f5a-b149-6b71dfd8c5ef',
                        CRED_TYPE.IDHP,
                        null,
                        {
                            "configuration": {
                                "rules": [
                                    "e4cc69fc-d18c-4f5a-b149-6b71dfd8c5ef"
                                ]
                            }
                        }
                    )
                );
                done();
            }).catch((error) => {
                done(error);
            });
    })
});

describe('evaluate GHP rules', () => {
    it('with good cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, ghpRules));
        verifier.evaluateRules(CRED_TYPE.GHP, ghpCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.GHP)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });

    it('with expired cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, ghpRules));
        ghpCred.external.validationClock = '2022-07-06T21:21:00Z';
        verifier.evaluateRules(CRED_TYPE.GHP, ghpCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(
                        false,
                        'Credential is not valid.  Failing rule id(s): b7b9b663-080e-41ac-96dd-1109d8c09f9d,65d2e8d6-36b4-4298-8a28-649718c72a2f',
                        CRED_TYPE.GHP,
                        null,
                        {
                            "configuration": {
                                "rules": [
                                    "b7b9b663-080e-41ac-96dd-1109d8c09f9d",
                                    "65d2e8d6-36b4-4298-8a28-649718c72a2f"
                                ]
                            }
                        }
                    )
                );
                done();
            }).catch((error) => {
                done(error);
            });
    })
});

describe('evaluate VCI rules', () => {
    it('with good cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, vciRules));
        verifier.evaluateRules(CRED_TYPE.SHC, vciCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.SHC)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
    it('with expired cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, vciRules));
        vciCred.external.validationClock = '2022-06-28T00:00:00.000Z'
        verifier.evaluateRules(CRED_TYPE.SHC, vciCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(
                        false,
                        'Credential is not valid.  Failing rule id(s): 4a2a9e4b-aed2-4b17-9b24-49c8deb70174',
                        CRED_TYPE.SHC,
                        null,
                        {
                            "configuration": {
                                "rules": [
                                    "4a2a9e4b-aed2-4b17-9b24-49c8deb70174",
                                ]
                            }
                        }
                    )
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
});

describe('evaluate EU rules', () => {
    it('with good vaccine cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, euRules));
        verifier.evaluateRules(CRED_TYPE.DCC, dccVaccineCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.DCC)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
    it('with good test cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, euRules));
        verifier.evaluateRules(CRED_TYPE.DCC, dccTestCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.DCC)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
    it('with good recovery cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, euRules));
        verifier.evaluateRules(CRED_TYPE.DCC, dccRecoveryCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(true, 'Credential is valid', CRED_TYPE.DCC)
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });

    it('with expired cred', (done) => {
        getRulesStub.returns(new VerificationResult(true, euRules));
        dccVaccineCred.external.validationClock = '2022-06-28T00:00:00.000Z'
        verifier.evaluateRules(CRED_TYPE.DCC, dccVaccineCred, params)
            .then(result => {
                expect(result).to.deep.equal(
                    new VerificationResult(false,
                        'Credential is not valid.  Failing rule id(s): bdc63070-4149-4dac-90cf-d8204fc1cdaa',
                        CRED_TYPE.DCC,
                        null,
                        {
                            "configuration": {
                                "rules": [
                                    "bdc63070-4149-4dac-90cf-d8204fc1cdaa",
                                ]
                            }
                        }
                    )
                );
                done();
            }).catch((error) => {
                done(error);
            });
    });
});
