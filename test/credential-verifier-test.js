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
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

const certificateFactory = require('./certificate-factory');
const payloadFactory = require('./payload-factory')
const { getCache } = require('../src/utils/cache');
const VerificationResult = require('../src/utils/verification-result');
const { CredentialVerifierBuilder } = require('..');
const {
    GoodTestVerifier,
    TestVerifierWithoutGetName,
    TestVerifierWithoutVerify,
    VerifierPluginWithoutExtends
} = require('./test-plugin');

const {
    CRED_TYPE,
    ISSUER_PATH,
    METERING_PATH,
    VERIFIER_CONFIG_PATH,
} = require('../src/constants');

const healthpassHost = 'http://localhost:3010';

chai.use(chaiAsPromised);
const { expect } = chai;

const verifyConfigId = '3e9b52cb-3177-4957-ab82-0384090637f6';

describe('CredentialVerifier', () => {
    const setupTokenNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .persist()
            .post(`${ISSUER_PATH}/users/loginWithCredential`,
                {
                    credential: certificateFactory.verifierCredential
                })
            .reply(200, {
                access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6IjIwNDEtMDktMDJUMTg6NDY6MTcuNTA0WiIsImlhdCI6MTYzMDYwODM3N30.1FygBH5aWO4xBi9F2UQcbj_FuEwpig5gAnW5hYeLfwo'
            });
    }

    const setupHealthpassNock = (credential) => {
        const issuerID = credential.issuer;
        const encodedCredentialID = credential.id.replace(/#/g, '%23');

        nock(healthpassHost, { allowUnmocked: false }).get(`${ISSUER_PATH}/issuers/${issuerID}`).reply(200, {
            payload: payloadFactory.getValidIbmPublicKeyPayload,
        });

        nock(healthpassHost, { allowUnmocked: false }).get(`${ISSUER_PATH}/issuers`).reply(200, {
            payload: payloadFactory.getValidIbmPublicKeyPayload,
        });

        nock(healthpassHost, { allowUnmocked: false })
            .get(`${ISSUER_PATH}/credentials/${encodedCredentialID}/revoked`)
            .reply(200, {
                payload: {
                    exists: false,
                },
            });
    };

    const setupGhpNock = (credential) => {
        const issuerID = credential.issuer;
        const encodedCredentialID = credential.id.replace(/#/g, '%23');

        nock(healthpassHost, { allowUnmocked: false }).get(`${ISSUER_PATH}/issuers/${issuerID}`).reply(200, {
            payload: payloadFactory.getValidGhpPublicKeyPayload,
        });

        nock(healthpassHost, { allowUnmocked: false })
            .get(`${ISSUER_PATH}/credentials/${encodedCredentialID}/revoked`)
            .reply(200, {
                payload: {
                    exists: false,
                },
            });
    };

    const setupVciPublicKeyNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .post(`${ISSUER_PATH}/generic-issuers/vci/query`)
            .reply(200, {
                payload: [
                    payloadFactory.getValidVciPublicKeyPayload
                ]
            });
    };

    const setupEuIssuerManagerNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .get(`${ISSUER_PATH}/generic-issuers/dcc/?kid=CFUoOhVtOgo%3D&country=PL`)
            .reply(200, payloadFactory.getValidEuIssuerManagerKeyPayload);
    };

    const setupVerifierConfigNock = () => {
        nock(healthpassHost, { allowUnmocked: false })
            .persist()
            .get(`${VERIFIER_CONFIG_PATH}/verifier-configurations`)
            .query({
                id: verifyConfigId,
                version: 'latest'
            })
            .reply(200, payloadFactory.getVerifierConfigPayloadPartial);

        nock(healthpassHost, { allowUnmocked: false })
            .persist()
            .get(`${VERIFIER_CONFIG_PATH}/verifier-configurations/content`)
            .query({
                id: verifyConfigId,
                version: 'latest'
            })
            .reply(200, payloadFactory.getVerifierConfigPayload);
    }

    const setupHealthNocks = () => {
        nock(healthpassHost, { allowUnmocked: false }).get(`${ISSUER_PATH}/health`).reply(200, {
            message: 'ok'
        });

        nock(healthpassHost, { allowUnmocked: false }).get(`${METERING_PATH}/health`).reply(200, {
            message: 'ok'
        });
    };

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        getCache().flushAll();
    });

    describe('with valid GHP credentials', () => {
        it('verifies a credential without expiration', (done) => {
            const credential = certificateFactory.goodGhpCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupGhpNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init().then(() => {
                builder.setCredential(credential)
                    .build()
                    .verify()
                    .then((response) => {
                        const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.GHP);
                        result.credentialCategory = 'VACCINATION'
                        expect(response).to.deep.equal(result);
                        done();
                    }).catch((error) => {
                        done(error);
                    });
            }).catch((error) => {
                done(error);
            });
        });

        it('verifies a credential without setting verifier credentials', (done) => {
            const credential = certificateFactory.goodGhpCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupGhpNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setCredential(credential);

            expect(builder.init()).to.be.rejectedWith('A verifier credential must be supplied');
            done();
        });
    });

    describe('with Valid IDHP Credentials', () => {
        // TODO: new rules do not allow this.  Enable once rules are corrected
        it.skip('verifies a credential without expiration', (done) => {
            const credential = certificateFactory.goodIBMCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init().then(() => {
                builder.setCredential(credential)
                    .build()
                    .verify()
                    .then((response) => {
                        const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.VC);
                        result.credentialCategory = 'GENERIC'
                        expect(response).to.deep.equal(result);
                        done();
                    }).catch((error) => {
                        done(error);
                    });
            })
                .catch((error) => {
                    done(error);
                });
        });

        it('verifies a base64 encoded credential', (done) => {
            const credential = certificateFactory.goodIBMCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const encoded = Buffer.from(JSON.stringify(credential)).toString('base64');
            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(encoded)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.IDHP);
                            result.credentialCategory = 'VACCINATION'
                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                }
                )
                .catch((error) => {
                    done(error);
                });
        });

        it('fails with disabled ibm verifier', (done) => {
            const credential = certificateFactory.goodIBMCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setDisabledPlugins('idhp-verifier');

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            expect(response).to.deep.equal(
                                new VerificationResult(false, 'Unknown Credential Type', CRED_TYPE.UNKNOWN)
                            );
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('verifies a credential with expiration', (done) => {
            const credential = certificateFactory.goodIBMCertificateWithExpiration;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.VC);
                            result.credentialCategory = 'GENERIC'
                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('verifies a credential with obfuscation', (done) => {
            const credential = certificateFactory.goodIBMObfuscatedCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.IDHP);
                            result.credentialCategory = 'VACCINATION'
                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('with valid eu credentials', () => {
        it('verifies HC1 json credential', (done) => {
            // TODO:  Need to generate our own credentials and public key
            const credential = certificateFactory.euHC1Credential;
            setupTokenNock();
            setupHealthNocks();
            setupEuIssuerManagerNock();
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)

            builder.init().then(() => {
                builder.setCredential(credential)
                    .build()
                    .verify()
                    .then((response) => {
                        const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.DCC);
                        result.credentialCategory = 'VACCINATION';
                        expect(response).to.deep.equal(result);
                        done();
                    }).catch((error) => {
                        done(error);
                    });
            })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('with valid VCI credentials', () => {
        it('verifies VCI JWS credential.  Public key from well known url', (done) => {
            const credential = certificateFactory.vciJwsCredential;
            setupTokenNock();
            setupHealthNocks();
            setupVciPublicKeyNock();
            setupVerifierConfigNock();
            setupVerifierConfigNock();
            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.SHC);
                            result.credentialCategory = 'VACCINATION';
                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('verifies VCI SHC credential', (done) => {
            const credential = certificateFactory.vciShcCredential;
            setupTokenNock();
            setupHealthNocks();
            setupVciPublicKeyNock();
            setupVerifierConfigNock();
            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(true, 'Credential is valid', CRED_TYPE.SHC);
                            result.credentialCategory = 'VACCINATION';
                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('with invalid IDHP Credentials', () => {
        it('verifies a credential with altered data', (done) => {
            const credential = certificateFactory.badIBMCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            expect(response).to.deep.equal(
                                new VerificationResult(
                                    false,
                                    `Certificate's signature is not valid`,
                                    CRED_TYPE.IDHP
                                )
                            );
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('verifies a credential that is expired', (done) => {
            const credential = certificateFactory.expiredIBMCertificate;
            setupTokenNock();
            setupHealthNocks();
            setupHealthpassNock(credential);
            setupVerifierConfigNock();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            const result = new VerificationResult(
                                false,
                                'Credential is not valid.  Failing rule id(s): 622ac36a-5099-4255-be03-c818853c5ce3',
                                CRED_TYPE.VC,
                                null,
                                {
                                    "configuration": {
                                        "rules": [
                                            "622ac36a-5099-4255-be03-c818853c5ce3"
                                        ]
                                    }
                                }
                            );
                            result.credentialCategory = 'GENERIC';

                            expect(response).to.deep.equal(result);
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('test 3rd party verifiers', () => {
        it('good verifier with valid credential', (done) => {
            const credential = {
                type: [
                    'GoodTestVerifier'
                ],
                test: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setAdditionalPlugins(GoodTestVerifier);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            expect(response).to.deep.equal(
                                new VerificationResult(true, 'Valid Test Plugin Credential'));
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
        it('good verifier with bad credential', (done) => {
            const credential = {
                bad: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setAdditionalPlugins(GoodTestVerifier);

            builder.init()
                .then(() => {
                    builder.setCredential(credential)
                        .build()
                        .verify()
                        .then((response) => {
                            expect(response).to.deep.equal(
                                new VerificationResult(false, 'Unknown Credential Type', CRED_TYPE.UNKNOWN)
                            );
                            done();
                        }).catch((error) => {
                            done(error);
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
        it('verifier missing required getName method', (done) => {
            const credential = {
                test: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setCredential(credential)
                .setAdditionalPlugins(TestVerifierWithoutGetName);

            builder.init().then(() => {
                const verifier = builder.build();
                expect(verifier.verify()).to.be.rejectedWith('getName() method must be implemented');
                done();
            }).catch((error) => {
                done(error);
            });

        });
        it('verifier missing required verify method', (done) => {
            const credential = {
                test: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setCredential(credential)
                .setAdditionalPlugins(TestVerifierWithoutVerify);

            builder.init().then(() => {
                const verifier = builder.build();
                expect(verifier.verify()).to.be.rejectedWith('verify() method must be implemented');
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('verifier that does not inherent from VerifierPlugin', (done) => {
            const credential = {
                test: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setCredential(credential)
                .setAdditionalPlugins(VerifierPluginWithoutExtends);

            builder.init().then(() => {
                const verifier = builder.build();
                expect(verifier.verify()).to.be.rejectedWith('Verifier plugins must inherent from VerifierPlugin');
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('all verifier plugins disabled', (done) => {
            const credential = {
                test: 'passed'
            };

            setupVerifierConfigNock();
            setupTokenNock();
            setupHealthNocks();

            const builder = new CredentialVerifierBuilder()
                .setHealthpassHostUrl(healthpassHost)
                .setVerifierCredential(certificateFactory.verifierCredential)
                .setCredential(credential)
                .setDisabledPlugins([
                    'divoc-verifier',
                    'eu-dcc-verifier',
                    'vci-verifier',
                    'idhp-verifier'
                ]);

            builder.init().then(() => {
                const verifier = builder.build();

                expect(verifier.verify()).to.be.rejectedWith('No verifier plugins are configured for verification');
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});
