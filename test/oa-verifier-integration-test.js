/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const {expect} = require('chai');
const sinon = require('sinon');
const OaVerifier = require('../src/verifier-plugins/oa-verifier');
const CredentialVerifierBuilder = require('../src/verifier/credential-verifier-builder');
const {invalidCredentials, credentials} = require('./resources/credentials');

// eslint-disable-next-line max-len
const verifierCredential = "eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiZGlkOmhwYXNzOjU5Y2Q2MDYzNDFlYjRhNGE2YzFhMjVkOTRhNWY4NDJlY2Y4M2NjZDQ0MWRiZGE4YWJjZDkyNzRjOWFjZDkzMzQ6NjdjYmE3NWIxNzE5YjVlZmJhMWFkZGQzMjYwMmY4MjdmZDM3OGYyNjU0Mjg4YjFhNGUzODFmOGRkZGY0MGFmMztpZD12ZXJpZmllcmxvZ2luO3ZlcnNpb249MC43IiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNvbmZpZ0lkIjoiYjVlOGE0YTMtMjI3OC00ODEyLTkzY2YtYTJjMjdlYzEzZjliOmxhdGVzdCIsImNvbmZpZ05hbWUiOiJ0ZXN0IiwiY3VzdG9tZXIiOiJCZXRhIiwiY3VzdG9tZXJJZCI6ImZhMDczZDA4LWNiMWItNGMwYS1iZmE0LTVmZjUwYTUyODZiMSIsIm5hbWUiOiJFbnRyeSBTY2FuIiwib3JnYW5pemF0aW9uIjoiQm9zdG9uIENvcnAiLCJvcmdhbml6YXRpb25JZCI6IjI4NjVjMTk0LWJmMjYtNDc3ZC1hNWM3LTJjZmMxOGZiM2U4MyIsInR5cGUiOiJWZXJpZmllckNyZWRlbnRpYWwiLCJ2ZXJpZmllclR5cGUiOiJOYXR1cmUgTWFuYWdlbWVudCJ9LCJleHBpcmF0aW9uRGF0ZSI6IjIwMzItMTItMTdUMDA6MDA6MDBaIiwiaWQiOiJkaWQ6aHBhc3M6NTljZDYwNjM0MWViNGE0YTZjMWEyNWQ5NGE1Zjg0MmVjZjgzY2NkNDQxZGJkYThhYmNkOTI3NGM5YWNkOTMzNDo2N2NiYTc1YjE3MTliNWVmYmExYWRkZDMyNjAyZjgyN2ZkMzc4ZjI2NTQyODhiMWE0ZTM4MWY4ZGRkZjQwYWYzI3ZjLTA2ZDNkZjllLTIxNjgtNGIyZC1hZTY0LWFjNGQ3YWE3ZGIzOSIsImlzc3VhbmNlRGF0ZSI6IjIwMjEtMTAtMjBUMTc6MTM6MjVaIiwiaXNzdWVyIjoiZGlkOmhwYXNzOjU5Y2Q2MDYzNDFlYjRhNGE2YzFhMjVkOTRhNWY4NDJlY2Y4M2NjZDQ0MWRiZGE4YWJjZDkyNzRjOWFjZDkzMzQ6NjdjYmE3NWIxNzE5YjVlZmJhMWFkZGQzMjYwMmY4MjdmZDM3OGYyNjU0Mjg4YjFhNGUzODFmOGRkZGY0MGFmMyIsInByb29mIjp7ImNyZWF0ZWQiOiIyMDIxLTEwLTIwVDE3OjEzOjI1WiIsImNyZWF0b3IiOiJkaWQ6aHBhc3M6NTljZDYwNjM0MWViNGE0YTZjMWEyNWQ5NGE1Zjg0MmVjZjgzY2NkNDQxZGJkYThhYmNkOTI3NGM5YWNkOTMzNDo2N2NiYTc1YjE3MTliNWVmYmExYWRkZDMyNjAyZjgyN2ZkMzc4ZjI2NTQyODhiMWE0ZTM4MWY4ZGRkZjQwYWYzI2tleS0xIiwibm9uY2UiOiJkNzlmZTIxNi00MTMxLTQ0MDItYjNkMi1jOWE3OWIzNDJkYTEiLCJzaWduYXR1cmVWYWx1ZSI6Ik1FUUNJSHV2NE10LXhxLThNeUN1Y0labEJvMElkZHJHcnNmbE81OG5wMDlBQzJUNUFpQVdTUGVDbGtSVjdaYkpYTXN4U2x5UUZBbFZvTFJOeGdiemFhWVpBR3VsMWciLCJ0eXBlIjoiRWNkc2FTZWNwMjU2cjFTaWduYXR1cmUyMDE5In0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXX0=";
const healthPassHost = 'https://sandbox1.wh-hpass.dev.acme.com';

let builder;
let sandbox;

// TODO: enable when we have a live verifier config that supports OA
describe.skip('oa verifier integration tests', () => {
    before(async function before() {
        this.timeout(100000)
        sandbox = sinon.createSandbox();
        builder = new CredentialVerifierBuilder()
            .setHealthpassHostUrl(healthPassHost)
            .setVerifierCredential(verifierCredential)
            .setAdditionalPlugins(OaVerifier)
            .setReturnCredential(true)
    
        const responseCode = await builder.init();
        if (!responseCode.success) {
            throw new Error('Fail to initialize verifier builder')
        }
    });
    
    describe('OA verifier', () => {
        describe('verify', () => {
            it('should return true given OA certificate is valid', async () => {
                const verifier = builder
                    .setCredential(credentials)
                    .build();
                const result = await verifier.verify();
                expect(result.success).to.be.true
            }).timeout(10000);
            it('should return true given OA certificate is invalid', async () => {
                const verifier = builder
                    .setCredential(invalidCredentials)
                    .build();
                const result = await verifier.verify()
                expect(result.success).to.be.false
            }).timeout(10000);
        }).timeout(10000);
    }).timeout(10000);
    
    afterEach(() => {
        sandbox.restore();
    });    
})

