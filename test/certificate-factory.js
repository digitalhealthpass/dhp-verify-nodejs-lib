/* eslint-disable class-methods-use-this, max-len */
/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const goodGhpCertificate = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-6bf08c89-a60d-45c0-b6d8-f623f43a7e17",
    "type": [
        "VerifiableCredential",
        "GoodHealthPass",
        "VaccinationCredential"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2021-09-08T18:39:27Z",
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
        "created": "2021-09-08T18:39:27Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "195f04cd-c307-40bf-939e-0b98af3c661c",
        "signatureValue": "MEQCIA9WVELkvlTt8g7yoZSj4RkjlyM6qvgDIREhHiBeqbfVAiBeZ8SDNYrOusiRdoBYB5SZU5YFwVLgmmHtW4afz7B_Mw",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

const goodIBMCertificate = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-af94fc87-1736-40c0-aad4-315a54ea12d1",
    "type": [
        "VerifiableCredential",
        "IDHP-VACCINATION",
        "Vaccination"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2022-03-07T18:39:38Z",
    "expirationDate": "2041-08-07T00:00:00Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=idhp-vaccination;version=0.1",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "batchNumber": "12345",
        "countryOfVaccination": "us",
        "dateOfVaccination": "2022-02-21",
        "disease": "COVID-19",
        "display": "#32CD32",
        "doseNumber": 2,
        "dosesPerCycle": 2,
        "marketingAuthorizationHolder": "Pfizer Inc",
        "medicinalProductCode": "208",
        "recipient": {
            "birthDate": "2000-10-10",
            "familyName": "Smith",
            "givenName": "Jane",
            "middleName": "Sarah"
        },
        "stateOfVaccination": "ca",
        "type": "Vaccination Card"
    },
    "proof": {
        "created": "2022-03-07T18:39:38Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "3a15a403-2596-46e3-b044-974878933233",
        "signatureValue": "MEUCIQDRKHgknzvuXggpwDmBlHuVp3Hg9HG3D6wmt690967qTQIgVKQ5uBcPpqMTqPHnIwQxots_p7Oyxq-oyhRRS6gaMpc",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

const goodIBMCertificateWithExpiration = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-02940125-753b-468a-b46b-b2384b200010",
    "type": [
        "VerifiableCredential",
        "IBMDigitalHealthPass"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2021-09-08T17:05:35Z",
    "expirationDate": "2031-08-07T00:00:00Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=vaccinationcard;version=0.5",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "display": "#00ff00",
        "history": [
            {
                "lotNumber": "679890",
                "manufacturer": "PFizer",
                "occurrenceDateTime": "2020-12-08",
                "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
                "vaccineCode": "0001A"
            }
        ],
        "lotNumber": "12345",
        "manufacturer": "PFizer",
        "occurrenceDateTime": "2020-12-30",
        "status": "completed",
        "subject": {
            "address": "1221 Big Lan, Cypress, Texas 75022",
            "birthDate": "2000-10-10",
            "email": "showme@poc.com",
            "gender": "female",
            "identity": [
                {
                    "extraField": "Extra ID Field",
                    "system": "texas.state.gov",
                    "type": "DL",
                    "value": "AP12345F"
                }
            ],
            "name": {
                "family": "Smith",
                "given": "Jane"
            },
            "phone": "214 555-1212"
        },
        "targetDisease": "Covid-19",
        "type": "Vaccination Card",
        "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
        "vaccineCode": "0002A"
    },
    "proof": {
        "created": "2021-09-08T17:05:35Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "7a4530b8-5b10-45ff-a877-6254c199371b",
        "signatureValue": "MEYCIQCe-5x7N3K9DYk-Tyvnm6GHKptSPWufGl6fsduYFhYo2QIhAPOWUFKb6A6643eMcfPMXPcj6aLys-CTSpRo2KRNWjac",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

const goodIBMObfuscatedCertificate = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-6e9a9a21-3f02-4023-9547-e17c307d41f5",
    "type": [
        "VerifiableCredential",
        "IBMDigitalHealthPass",
        "Vaccination"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2022-03-07T18:21:37Z",
    "expirationDate": "2041-08-07T00:00:00Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=idhp-vaccination;version=0.1",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "batchNumber": "12345",
        "countryOfVaccination": "us",
        "dateOfVaccination": "2022-02-21",
        "disease": "COVID-19",
        "display": "#32CD32",
        "doseNumber": 2,
        "dosesPerCycle": 2,
        "marketingAuthorizationHolder": "Pfizer Inc",
        "medicinalProductCode": "208",
        "recipient": {
            "birthDate": "C3aGcqvWKQeUvGaEMDP7AT5UaaV7rnJ0J1g883hTL4A",
            "familyName": "Z-2datE7xoaBoPnCXOGPpEtxoKSOao2JbG8WEgLBoq0",
            "givenName": "PwtcUmI4lPNAEKyqjAOPEkIEPJivxcENrgYHiFyW9PA",
            "middleName": "0Xd5tMjkw7Z5P0iv6GVJhxUZeKB7cogdC3A_jnaqVsk"
        },
        "stateOfVaccination": "ca",
        "type": "Vaccination Card"
    },
    "proof": {
        "created": "2022-03-07T18:21:37Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "c6692423-885f-4ce5-bbd4-7cd9d8a67523",
        "signatureValue": "MEYCIQDLfNdJjK_uOo7_j2xzVNN7MKRL25upZFa50MkRzn_OQgIhAKlyk4URhCJOe9rZJJH6HOZ_xAZUQEI5hnqZPUU2HLFU",
        "type": "EcdsaSecp256r1Signature2019"
    },
    "obfuscation": [
        {
            "val": "Jane",
            "alg": "HS256",
            "nonce": "9fDCgvQsFdDoRL1US93ckAXv96GcNz1uxMZz4Eqc6Cs",
            "path": "recipient.givenName"
        },
        {
            "val": "Sarah",
            "alg": "HS256",
            "nonce": "93FkmvvtZITy34H2CcIc4kRse2RtCEnvyO3wn4UpmAo",
            "path": "recipient.middleName"
        },
        {
            "val": "Smith",
            "alg": "HS256",
            "nonce": "npCSDgPJEe8Jd0bNI9XpV9nX1BqM5DQZPzPz2jB1A-U",
            "path": "recipient.familyName"
        },
        {
            "val": "2000-10-10",
            "alg": "HS256",
            "nonce": "9jsBgvzZinvE3Uj7OzQFEE0grOIZdSy-dvP3r13hReo",
            "path": "recipient.birthDate"
        }
    ]
}

const expiredIBMCertificate = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-6616166d-0234-41af-a6dc-6678dedd4042",
    "type": [
        "VerifiableCredential",
        "IBMDigitalHealthPass"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2021-09-08T17:11:32Z",
    "expirationDate": "2021-09-08T17:12:00Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=vaccinationcard;version=0.5",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "display": "#00ff00",
        "history": [
            {
                "lotNumber": "679890",
                "manufacturer": "PFizer",
                "occurrenceDateTime": "2020-12-08",
                "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
                "vaccineCode": "0001A"
            }
        ],
        "lotNumber": "12345",
        "manufacturer": "PFizer",
        "occurrenceDateTime": "2020-12-30",
        "status": "completed",
        "subject": {
            "address": "1221 Big Lan, Cypress, Texas 75022",
            "birthDate": "2000-10-10",
            "email": "showme@poc.com",
            "gender": "female",
            "identity": [
                {
                    "extraField": "Extra ID Field",
                    "system": "texas.state.gov",
                    "type": "DL",
                    "value": "AP12345F"
                }
            ],
            "name": {
                "family": "Smith",
                "given": "Jane"
            },
            "phone": "214 555-1212"
        },
        "targetDisease": "Covid-19",
        "type": "Vaccination Card",
        "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
        "vaccineCode": "0002A"
    },
    "proof": {
        "created": "2021-09-08T17:11:32Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "d81453fa-2616-42a4-95f2-8b53b230bc03",
        "signatureValue": "MEYCIQCKihgG75W5igK_t45mcx7U1e3E37T1f05S1d0c0zg34gIhAOEGZsyb_FAw_s3oW9ki8pTNUX3SYgsJ8vvFbvVnF4f2",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

const badIBMCertificate = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-405a10fc-e0b4-4271-a00b-c2c0f3936327",
    "type": [
        "VerifiableCredential",
        "IBMDigitalHealthPass"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2021-09-08T17:01:08Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=vaccinationcard;version=0.5",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "display": "#00ff00",
        "history": [
            {
                "lotNumber": "679890",
                "manufacturer": "PFizer",
                "occurrenceDateTime": "2020-12-08",
                "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
                "vaccineCode": "0001A"
            }
        ],
        "lotNumber": "12345",
        "manufacturer": "PFizer",
        "occurrenceDateTime": "2020-12-30",
        "status": "completed",
        "subject": {
            "address": "1221 Big Lan, Cypress, Texas 75022",
            "birthDate": "2000-10-10",
            "email": "showme@poc.com",
            "gender": "female",
            "identity": [
                {
                    "extraField": "Extra ID Field",
                    "system": "texas.state.gov",
                    "type": "DL",
                    "value": "AP12345F"
                }
            ],
            "name": {
                "family": "Altered",
                "given": "Jane"
            },
            "phone": "214 555-1212"
        },
        "targetDisease": "Covid-19",
        "type": "Vaccination Card",
        "vaccine": "Pfizer-Biontech Covid-19 Vaccine",
        "vaccineCode": "0002A"
    },
    "proof": {
        "created": "2021-09-08T17:01:08Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "6d64e866-808b-4e37-866f-7edbdc157adb",
        "signatureValue": "MEUCIGZj2UVf-xT9dGDwZLyEUu4MbRexkcJpKN4oSeAaTB2lAiEAwxd16NeCJX5OlpQMlXIoLFE0thzMyKKV929pt9c_M38",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

const badIBMObfuscatedCertificate = {
    '@context': {
        cred: 'https://www.w3.org/2018/credentials/v1',
    },
    id:
        'did:hpass:hpassmsp:168177860027524692141214909370093187891466594936#vc-5818b662-48ca-4f69-be61-4c644e7f6fca',
    type: ['VerifiableCredential'],
    issuer: 'did:hpass:hpassmsp:168177860027524692141214909370093187891466594936',
    issuanceDate: '2020-10-06T12:50:22Z',
    credentialSchema: {
        id: 'did:hpass:hpassmsp:326154139805929658112786998782875574410195742971;id=encountr-demo;version=0.2',
        type: 'JsonSchemaValidator2018',
    },
    credentialSubject: {
        issueDate: '2020-06-17 08:30:00',
        loinc: '2hw8gIzACDvE7YiEW119vvEiKVhzSx6Lj3lOYNnnFQc',
        person: {
            name: {
                familyName: 'Bobevici',
                givenName: '2eM-LrDsvg3HiK-B_opFNQsvMYUxLC9hKkGScr2u9q4',
            },
        },
        result: 'Positive',
    },
    proof: {
        created: '2020-10-06T12:50:22Z',
        creator: 'did:hpass:hpassmsp:168177860027524692141214909370093187891466594936#key-1',
        nonce: '8c5e2b02-5273-4aa9-9cca-726d82c4b9d9',
        signatureValue:
            'MEQCIBdnNN-ZDHf9QBOmGBp6qRkPkc1qXwR1nrgbRAkUexwBAiBphYgALrGc1-LQYZI5mzhWXsSdHY5g9PUismWHT954Kg',
        type: 'EcdsaSecp256r1Signature2019',
    },
    obfuscation: [
        {
            val: 'Alic',
            alg: 'HS256',
            nonce: 'LURJtaZL6nZJUvsmw3ZHSuKH9mxaDUqkdM4qHJ0RWbU',
            path: 'person.name.givenName',
        },
        {
            val: 'Smth',
            alg: 'HS256',
            nonce: 'N9jZ3h1jXJWQLkLFWgC_UPCWid2gWI1t7n6jQr2r_78',
            path: 'loinc',
        },
    ],
};

const euHC1Credential = 'HC1:6BFOXN%TS3DH1QG9WA6H98BRPRHO DJS4F3S-%2LXKQGLAVDQ81LO2-36/X0X6BMF6.UCOMIN6R%E5UX4795:/6N9R%EPXCROGO3HOWGOKEQBKL/645YPL$R-ROM47E.K6K8I115DL-9C1QD+82D8C+ CH8CV9CA$DPN0NTICZU80LZW4Z*AK.GNNVR*G0C7PHBO33/X086BTTTCNB*UJHMJ8J3HONNQN09B5PNVNNWGJZ730DNHMJSLJ*E3G23B/S7-SN2H N37J3 QTULJ7CB3ZC6.27AL4%IY.IQH5YRT5*K51T 1DT 456L X4CZKHKB-43.E3KD3OAJ/9TL4T1C9 UP IPGTUI7FKQU2N1L8VFLU9WU.B9 UPYR181A0+P8V7/JA--J/XTQWE/PEBLEH-BY.CECH$6KJEM*PC9JAU-BZ8ERJCS0DUMQI+O1-ST*QGTA4W7.Y7G+SB.V Q5NN9TJ1TM8554.8EW E2NS6F9$J3-MQPSUB*H1EI+TUN73 39EX4165ABSXFB487V*K9J8UJC08H3N7T:DAIJC8K8T3TCF*6P.OB9Q721UJ+K.OJ4EW/S1*13PNG';

const vciJwsCredential = 'eyJ6aXAiOiJERUYiLCJhbGciOiJFUzI1NiIsImtpZCI6IjNLZmRnLVh3UC03Z1h5eXd0VWZVQUR3QnVtRE9QS01ReC1pRUxMMTFXOXMifQ.3ZJLb9swEIT_SrC9ypIopBGsW50CTXIoCjTtpfCBptYWCz4EkhLiBvrv3aUd9IEkp56q24rDjzNDPoKOEToYUhpjV1VxRFVGK0MaUJo0lEqGPlb4IO1oMFaknjBAAW63h05cNU3btLVYl1eigFlB9wjpOCJ0334h_6a9OQ0rHoj0sk5bOzn9Qybt3atC5WfdizVsC1ABe3RJS_N52n1HldjSftDhK4bInA4uy7oUxOO_m8n1BlkTMPopKLzP9uG8UJzjgPLGEO3khA4IR8pI5MmYL8GQ4Gl_V5PgaXgG_Ini0H6uUFo8QaTVhnjwzpEmxHzGQc_ouMc7P_C8KWG7UMCdpvDvZWKWWL8Vq1qsmhqWpXjWjXjdze2fFcck0xRzXL7vhHxBs1RKO7z2fSYo32t3yMbjMSa05-dDNzOYtvThUHGzVdR9peYHAqi8E5q6hWW7FDCeK8h29hjQsbffGySRV2oKeYnD3mt7QjQ5cM2xqKq9D5aeI3uRKvnAyF7H0chc5-b64gM6DNJc3Pg46iQNFUUlGp8-TnbHW6HOn3ixwea_bLBZ_-sGW15Y6PsJ.0Rv4XMPtu4_1GU69yNfE05-2-DEhZtyrAX21PdOm-8iGFl_0GNSjADPxWFDKEAnK2cWv4uSgGLW2AY2GSVFUKg';

const vciShcCredential = 'shc:/5676290952432060346029243740446031222959532654603460292540772804336028702864716745222809286133314564376531415906402203064504590856435503414245413640370636654171372412363803043756220467374075323239254334433260573601064529315312707424283950386922127667286667212670420803223943286622613971675722216771444222770724625931602173697306524055122824626708096805076923617733233566303424396644405967614104417537254126300332524029660363246826356353072834046632255262656121202042090659030854334006537131414463045660582563211274616734222903060607595009521234360369276661037062085334776512367653710652712208425755607741702204202156063729385033080565042763556138577123593007532865200772761066407534345064116504216362393235666730317735127226114029776158353126243406625920072837116728083264443111263607266350410835585243582650286560032709724025661136523941596561747767246475277726365450667232541035502211304226104032225567732373454230424231114168046870645968426743614261436155775605572554546203753777433110735927752170043730341077055738446606057106763253613238520308005523337734447173395940272677415537126756442720686011240868095942421025232256301159051259613670535757267638374105663056446523066471103661360854320575683068122308525628067237307365207625102703545954080053090758320923332954063558070960363325404063266711003965532742092734650660757456525053312145500070264204084409357029010337730743323571720750042640091276335724030800050023245945717669204305043555346400116026256350032633386120233575422523302420653005544273077238582631420520440526384125403058';

const verifierCredential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#vc-44b15006-6dc0-4e44-99da-94cf4db58829",
    "type": [
        "VerifiableCredential"
    ],
    "issuer": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
    "issuanceDate": "2021-09-16T19:15:34Z",
    "expirationDate": "2032-12-17T00:00:00Z",
    "credentialSchema": {
        "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3;id=verifierlogin;version=0.3",
        "type": "JsonSchemaValidator2018"
    },
    "credentialSubject": {
        "customer": "Beta",
        "configId": "3e9b52cb-3177-4957-ab82-0384090637f6:latest",
        "customerId": "fa073d08-cb1b-4c0a-bfa4-5ff50a5286b1",
        "name": "Entry Scan",
        "organization": "Boston Corp",
        "organizationId": "2865c194-bf26-477d-a5c7-2cfc18fb3e83",
        "type": "VerifierCredential",
        "verifierType": "Nature Management"
    },
    "proof": {
        "created": "2021-09-16T19:15:34Z",
        "creator": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
        "nonce": "53c7e861-8517-4115-ba8f-32fd7ae06b39",
        "signatureValue": "MEUCIQDgjLXhxhD9OFQN3VjxF3pODQf4OG-XkGKYys7szk3NCwIgXR8_8h5HUxCbyUWOHemtoaKBUYpayqra2OnoCcqwGbE",
        "type": "EcdsaSecp256r1Signature2019"
    }
};

module.exports = {
    goodGhpCertificate,
    goodIBMCertificate,
    goodIBMCertificateWithExpiration,
    goodIBMObfuscatedCertificate,
    expiredIBMCertificate,
    badIBMCertificate,
    badIBMObfuscatedCertificate,
    euHC1Credential,
    vciJwsCredential,
    vciShcCredential,
    verifierCredential,
};
