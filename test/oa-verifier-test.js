/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const oa = require('@govtechsg/open-attestation');
const {expect} = require('chai');
const sinon = require('sinon');
const oaVerify = require('@govtechsg/oa-verify');
const OaVerifier = require('../src/verifier-plugins/oa-verifier');
const VerificationResult = require('../src/utils/verification-result');
const CredentialVerifierParams = require('../src/verifier/credential-verifier-params');
const { CRED_TYPE } = require('../src/constants');

let oaVerifier;
let sandbox;

beforeEach(() => {
    sandbox = sinon.createSandbox();
    oaVerifier = new OaVerifier();
});
describe('OA verifier', () => {
    describe('verifyOASignature', () => {
        it('should return true given OA signature is valid', (done) => {
            sandbox.stub(oa, 'verifySignature').returns(true);
            expect(oaVerifier._validateSignature('OpenAttestation')).to.be.true;
            done();
        });
        it('should return true given OA signature is invalid', (done) => {
            sandbox.stub(oa, 'verifySignature').returns(false);
            expect(oaVerifier._validateSignature('OpenAttestation')).to.be.false;
            done();
        });
    });

    describe('getName', () => {
        it('should return correct name', (done) => {
            expect(oaVerifier.getName()).to.equals('oa-verifier');
            done();
        });
    });

    describe('verify', () => {
        it('should return VerificationResult true with message when all check pass', async () => {
            const verificationResult = new VerificationResult(
                true, 'OA certificate verification passed', CRED_TYPE.OA
            )

            sandbox.stub(oaVerifier, '_validateSignature').returns(true);
            sandbox.stub(oaVerifier, '_validOnEthereumWallet').returns(new VerificationResult(true));
            sandbox.stub(oaVerifier, '_isCredentialValid').returns(verificationResult);

            const params = sandbox.createStubInstance(CredentialVerifierParams);
            params.getCredential.returns('OpenAttestation');
            const result = await oaVerifier.verify('OpenAttestation', params);
            expect(result).to.deep.equals(verificationResult);
        });

        it('should return VerificationResult false with message when signature check fail', async () => {
            sandbox.stub(oaVerifier, '_validateSignature').returns(false);
            const params = sandbox.createStubInstance(CredentialVerifierParams);
            params.getCredential.returns('OpenAttestation');
            const result = await oaVerifier.verify('OpenAttestation', params);
            expect(result).to.deep.equals(new VerificationResult(
                false, "Certificate's signature is not valid", CRED_TYPE.OA, 'OpenAttestation'
            ));
        });

        it('should return VerificationResult false with message when Ethereum wallet check fail', async () => {
            const result = new VerificationResult(
                false, 'Certificate is not found in wallet', CRED_TYPE.OA, 'OpenAttestation'
            );
            sandbox.stub(oaVerifier, '_validateSignature').returns(true);
            sandbox.stub(oaVerifier, '_validOnEthereumWallet').returns(result);
            const params = sandbox.createStubInstance(CredentialVerifierParams);
            params.getCredential.returns('OpenAttestation');
            const verifyResult = await oaVerifier.verify('OpenAttestation', params);
            expect(verifyResult).to.deep.equals(result);
        });
    });

    describe('validOnEthereumWallet', () => {
        it('should return false when ethereum verify fail', async () => {
            oaVerifier.verifier = sandbox.stub();
            oaVerifier.verifier.withArgs('OpenAttestation').returns([
                {
                    "reason": {
                        "message": "Error"
                    },
                    "status": "ERROR"
                }
            ]);

            const isValidStub = () => {
                return () => {
                    return false;
                };
            };
            sandbox.replaceGetter(oaVerify, 'isValid', isValidStub);
            const result = await oaVerifier._validOnEthereumWallet('OpenAttestation');
            expect(result.success).to.be.false;
        });

        it('should return true when ethereum verify pass', async () => {
            oaVerifier.verifier = sandbox.stub();
            oaVerifier.verifier.withArgs('OpenAttestation').returns([]);

            const isValidStub = () => {
                return () => {
                    return true;
                };
            };
            sandbox.replaceGetter(oaVerify, 'isValid', isValidStub);
            const result = await oaVerifier._validOnEthereumWallet('OpenAttestation');
            expect(result.success).to.be.true;
        });
    });
});

afterEach(() => {
    sandbox.restore();
});
