/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable max-len */
const getValidIbmPublicKeyPayload = {
    publicKey: [
        {
            id: "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
            type: "P-256",
            controller: "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
            publicKeyJwk: {
                crv: "P-256",
                kty: "EC",
                x: "vcERK_HpNQYuU1OXRuEh8chTyKOuuFjDQCgi0zBg9Ns",
                y: "Jtle_ci3djH3bRr5hXlxpDbTFRigK4kfHWKPpRU0_KU"
            }
        },
    ],
};

const getValidGhpPublicKeyPayload = {
    "publicKey": [
        {
            "id": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3#key-1",
            "type": "P-256",
            "controller": "did:hpass:59cd606341eb4a4a6c1a25d94a5f842ecf83ccd441dbda8abcd9274c9acd9334:67cba75b1719b5efba1addd32602f827fd378f2654288b1a4e381f8dddf40af3",
            "publicKeyJwk": {
                "crv": "P-256",
                "kty": "EC",
                "x": "vcERK_HpNQYuU1OXRuEh8chTyKOuuFjDQCgi0zBg9Ns",
                "y": "Jtle_ci3djH3bRr5hXlxpDbTFRigK4kfHWKPpRU0_KU"
            }
        }
    ]
};

const getValidVciPublicKeyPayload = {
    keys: [
        {
            kty: 'EC',
            kid: '3Kfdg-XwP-7gXyywtUfUADwBumDOPKMQx-iELL11W9s',
            use: 'sig',
            alg: 'ES256',
            crv: 'P-256',
            x: '11XvRWy1I2S0EyJlyf_bWfw_TQ5CJJNLw78bHXNxcgw',
            y: 'eZXwxvO1hvCY0KucrPfKo7yAyMT6Ajc3N7OkAB6VYy8'
        },
        {
            kty: 'EC',
            kid: 'EBKOr72QQDcTBUuVzAzkfBTGew0ZA16GuWty64nS-sw',
            use: 'sig',
            alg: 'ES256',
            x5c: [],
            crv: 'P-256',
            x: 'PQHApUWm94mflvswQgAnfHlETMwJFqjUVSs7WU6LQy4',
            y: '7mj8IO-8V5VZjDbRVsJINC_Rq5ai5CDhFX18ceRsLWQ'
        }
    ]
};

const getValidEuIssuerManagerKeyPayload = {
    type: 'dcc-issuer-collection',
    payload: {
        payload: [
            {
                certificateType: 'DSC',
                country: 'PL',
                kid: 'CFUoOhVtOgo=',
                rawData: 'MIICnDCCAkKgAwIBAgIIJr8oA/3jYAQwCgYIKoZIzj0EAwIwUDEkMCIGA1UEAwwbUG9sYW5kIERHQyBSb290Q1NDQSAxIEFDQyBTMRswGQYDVQQKDBJNaW5pc3RyeSBvZiBIZWFsdGgxCzAJBgNVBAYTAlBMMB4XDTIxMDUyNDExMTgxNloXDTIzMDUyNDExMTgxNlowcjEtMCsGA1UEAwwkUG9sYW5kIFZhY2NpbmF0aW9uIERHQyBTZXJ2aWNlIDMgQUNDMRcwFQYDVQQLDA5lSGVhbHRoIENlbnRlcjEbMBkGA1UECgwSTWluaXN0cnkgb2YgSGVhbHRoMQswCQYDVQQGEwJQTDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABBb5V0Rbo5Qc1yAVxRyXaLt/QjmI4WG3qsXf81WoH6L2Uf4oj5iGnAuem1TSotax+FUgvn+GbcUg7BTrL+ePAQSjgeMwgeAwHwYDVR0jBBgwFoAUqc15HwkAJgfQl/0DpjHxRVJ9E28wFgYDVR0lBA8wDQYLKwYBBAGON49lAQIwTAYDVR0fBEUwQzBBoD+gPYY7aHR0cDovL2FjYy1wMS5lemRyb3dpZS5nb3YucGwvY2NwMS9jcmwvREdDUm9vdENTQ0ExQUNDUy5jcmwwHQYDVR0OBBYEFAenLsHAhybxn8MjzWYLq+xrD8iYMCsGA1UdEAQkMCKADzIwMjEwNTI0MTExODE2WoEPMjAyMjA1MjQxMTE4MTZaMAsGA1UdDwQEAwIHgDAKBggqhkjOPQQDAgNIADBFAiEAw17oXs3K8q+VorcGq014/zCZAnxqRIQ6fCkHGCENJWQCIB3hvpk+NdLphX7aokerbhsF6xuJ7hT6DnD67SFgLI/9',
                signature: 'string',
                thumbprint: 'string'
            },
            {
                certificateType: 'DSC',
                country: 'PL',
                kid: 'FDNJjaSCWi0=',
                rawData: 'string',
            },
        ]
    }
};

// eslint-disable-next-line max-lines-per-function
const getVerifierConfigPayload = {
    "type": "verifier-configuration-content-collection",
    "payload": [
        {
            "id": "3e9b52cb-3177-4957-ab82-0384090637f6",
            "created_by": "hpass.default_verifier",
            "created_at": "2022-03-04T17:24:25Z",
            "updated_at": "2022-03-04T17:24:25Z",
            "version": "1.0.0",
            "name": "[NEW MODEL] Complete ruleset",
            "offline": false,
            "refresh": 86400,
            "masterCatalog": true,
            "specificationConfigurations": [
                {
                    "id": "d176d25b-f9d1-4a41-80d4-8c298b244b8b",
                    "version": "1.0.0",
                    "name": "DCC-RECOVERY",
                    "description": "A credential issued according to EU DCC specification that indicates a persons recovery from a disease.",
                    "credentialSpec": "DCC",
                    "credentialSpecDisplayValue": "EU Digital COVID Certificate",
                    "credentialCategory": "RECOVERY",
                    "credentialCategoryDisplayValue": "Recovery",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a DCC recovery certificate based on the schema.",
                        "id": "b5408bf7-f3c7-4454-8684-de4a02481eeb",
                        "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, \"DCC-RECOVERY\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer",
                            "extract": {
                                "issuerDID": "*[0].is"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "nam.gn",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "nam.gnt",
                                    "displayValue": {
                                        "en": "First Name (transliterated)",
                                        "de": "Vorname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "nam.fn",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "nam.fnt",
                                    "displayValue": {
                                        "en": "Surname (transliterated)",
                                        "de": "Nachname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "dob",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "868e2d1f-9152-47b4-b1a4-ec29bdd2282c"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check if recovery is from predefined disease",
                            "id": "4d8cbbe4-059a-406b-9b72-13164aa46c27",
                            "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, {\"in\": [{\"var\": \"payload.r.0.tg\"}, {\"var\": \"external.approvedDiseases\"}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check current date is within the covered dates for recovery",
                            "id": "eab75840-3896-4377-8237-35b9e079a907",
                            "predicate": "{\"if\": [{\"var\": \"payload.r.0\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.r.0.df\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.r.0.du\"}, 0, \"day\"]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that there is only single record in certificate",
                            "id": "f6f81718-f4ff-4e6d-88b9-202db5da5c46",
                            "predicate": "{\"if\": [{\"var\": \"payload.r\"}, {\"!\": [{\"var\": \"payload.r.1\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "aa48aecf-3ff7-44f2-96f8-23cf296453cb",
                    "version": "1.0.0",
                    "name": "DCC-TEST",
                    "description": "A credential issued according to EU DCC specification that indicates a persons test.",
                    "credentialSpec": "DCC",
                    "credentialSpecDisplayValue": "EU Digital COVID Certificate",
                    "credentialCategory": "TEST",
                    "credentialCategoryDisplayValue": "Test",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a DCC test certificate based on the schema.",
                        "id": "d435dfea-aebb-4625-983a-1eedc57a9b88",
                        "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, \"DCC-TEST\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer",
                            "extract": {
                                "issuerDID": "*[0].is"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "nam.gn",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "nam.gnt",
                                    "displayValue": {
                                        "en": "First Name (transliterated)",
                                        "de": "Vorname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "nam.fn",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "nam.fnt",
                                    "displayValue": {
                                        "en": "Surname (transliterated)",
                                        "de": "Nachname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "dob",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "868e2d1f-9152-47b4-b1a4-ec29bdd2282c"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since test is less then predefined value",
                            "id": "61a3bbfb-422d-40d0-a5a6-56f6cba003cb",
                            "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"or\": [{\"and\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.t.0.sc\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for approved test",
                            "id": "fb830f1f-9844-49a1-9820-d043409abecb",
                            "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"or\": [{\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"in\": [{\"var\": \"payload.t.0.tt\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for negative test result",
                            "id": "8a2cf6ef-f44d-4f5c-8448-3262d983e865",
                            "predicate": "{\"if\": [{\"var\": \"payload.t.0\"}, {\"in\": [{\"var\": \"payload.t.0.tr\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that there is only single record in certificate",
                            "id": "90ec030b-aa1e-48b0-9919-0a593e22e1ed",
                            "predicate": "{\"if\": [{\"var\": \"payload.t\"}, {\"!\": [{\"var\": \"payload.t.1\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "59ed37c8-ee7b-4c12-b46d-c396f1925cc5",
                    "version": "1.0.0",
                    "name": "DCC-VACCINATION",
                    "description": "A credential issued according to EU DCC specification that indicates a persons immunization.",
                    "credentialSpec": "DCC",
                    "credentialSpecDisplayValue": "EU Digital COVID Certificate",
                    "credentialCategory": "VACCINATION",
                    "credentialCategoryDisplayValue": "Vaccination",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a DCC vaccination certificate based on the schema.",
                        "id": "85d7b0c0-de6b-461e-9373-fbd18f9c6836",
                        "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, \"DCC-VACCINATION\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer",
                            "extract": {
                                "issuerDID": "*[0].is"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "nam.gn",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "nam.gnt",
                                    "displayValue": {
                                        "en": "First Name (transliterated)",
                                        "de": "Vorname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "nam.fn",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "nam.fnt",
                                    "displayValue": {
                                        "en": "Surname (transliterated)",
                                        "de": "Nachname (transliteriert)"
                                    }
                                },
                                {
                                    "field": "dob",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "868e2d1f-9152-47b4-b1a4-ec29bdd2282c"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved vaccine",
                            "id": "d8d8cb83-fce5-4722-98a2-3b0edc6d314e",
                            "predicate": "{\"if\": [{\"var\": \"payload.v.0\"}, {\"in\": [{\"var\": \"payload.v.0.mp\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that there is only single record in certificate",
                            "id": "afbc7321-c7d5-4fe1-ab83-cc04e90022fb",
                            "predicate": "{\"if\": [{\"var\": \"payload.v\"}, {\"!\": [{\"var\": \"payload.v.1\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "0fe78927-d30e-4379-8811-702e2f8effc4",
                    "version": "1.0.0",
                    "name": "SHC-VACCINATION",
                    "description": "A credential issued according to SHC specification that indicates a persons vaccination.",
                    "credentialSpec": "SHC",
                    "credentialSpecDisplayValue": "Smart Health Card",
                    "credentialCategory": "VACCINATION",
                    "credentialCategoryDisplayValue": "Vaccination",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a SHC vaccination certificate based on the value in type field.",
                        "id": "b111e6a1-e9e1-4514-81b9-9be7e7c73403",
                        "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#immunization\", {\"var\": \"payload.vc.type\"}]}, \"SHC-VACCINATION\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "iss",
                                "credentialType": "vc.type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "a180bbc5-c401-489d-9278-1fbe42e0a2f0"
                        }
                    ],
                    "rules": [],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "5142acea-53bd-4b95-a742-7c7212767d42",
                    "version": "1.0.0",
                    "name": "SHC-TEST",
                    "description": "A credential issued according to SHC specification that indicates a persons test.",
                    "credentialSpec": "SHC",
                    "credentialSpecDisplayValue": "Smart Health Card",
                    "credentialCategory": "TEST",
                    "credentialCategoryDisplayValue": "Test",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a SHC test certificate based on the value in type field.",
                        "id": "5ca7034e-759b-406f-884b-b2143edced84",
                        "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#laboratory\", {\"var\": \"payload.vc.type\"}]}, \"SHC-TEST\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "iss",
                                "credentialType": "vc.type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "a180bbc5-c401-489d-9278-1fbe42e0a2f0"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved test",
                            "id": "9f4e7ad2-591a-44e0-8bb6-947faa011d75",
                            "predicate": "{\"if\": [{\"var\": \"payload.data.fhirBundle\"}, {\"or\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for negative test result",
                            "id": "44b93f79-adf7-4d73-8d82-4a40012aa583",
                            "predicate": "{\"if\": [{\"var\": \"payload.data.fhirBundle\"}, {\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.valueCodeableConcept.coding.0.code\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since test is less then predefined value",
                            "id": "80c60e79-b6e1-4d3a-9a32-c0e704e4c46a",
                            "predicate": "{\"if\": [{\"var\": \"payload.data.fhirBundle\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.effectiveDateTime\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.effectiveDateTime\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.code.coding.0.code\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.effectiveDateTime\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.data.fhirBundle.entry.1.resource.effectiveDateTime\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "ce524989-058a-483f-8e7f-5d264d0bdd55",
                    "version": "1.0.0",
                    "name": "VC-GENERIC",
                    "description": "Verifiable Credential - A generic type of credential.",
                    "credentialSpec": "VC",
                    "credentialSpecDisplayValue": "Verifiable Credential",
                    "credentialCategory": "GENERIC",
                    "credentialCategoryDisplayValue": "Generic",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a VC generic certificate based on the schema and values in type field.",
                        "id": "25197aca-f96f-4eb3-a1d7-f7b9740bb6c8",
                        "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.type\"}, {\"!\": {\"in\": [\"TestCredential\", {\"var\": \"payload.type\"}]}}, {\"!\": {\"in\": [\"VaccinationCredential\", {\"var\": \"payload.type\"}]}}, {\"!\": {\"in\": [\"Vaccination\", {\"var\": \"payload.type\"}]}}, {\"!\": {\"in\": [\"Test\", {\"var\": \"payload.type\"}]}}, {\"!\": {\"in\": [\"Temperature\", {\"var\": \"payload.type\"}]}}, {\"!\": {\"in\": [\"Pass\", {\"var\": \"payload.type\"}]}}]}, \"VC-GENERIC\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.0"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check the credential is not expired",
                            "id": "622ac36a-5099-4255-be03-c818853c5ce3",
                            "predicate": "{\"if\": [{\"var\": \"payload.expirationDate\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"day\"]}, {\"plusTime\": [{\"var\": \"payload.expirationDate\"}, 0, \"day\"]}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "459d55a6-09d5-46b3-bbf0-2cfd47dc601f",
                    "version": "1.0.0",
                    "name": "GHP-VACCINATION",
                    "description": "A credential issued according to GHP specification that indicates a persons vaccination.",
                    "credentialSpec": "GHP",
                    "credentialSpecDisplayValue": "Good Health Pass",
                    "credentialCategory": "VACCINATION",
                    "credentialCategoryDisplayValue": "Vaccination",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a GHP vaccination certificate based on the value in type field.",
                        "id": "6442a7db-63b3-4808-b410-b687b51a4667",
                        "predicate": "{\"if\": [{\"in\": [\"VaccinationCredential\", {\"var\": \"payload.type\"}]}, \"GHP-VACCINATION\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved vaccine",
                            "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "d41004be-bd00-4ecb-8ec9-82f9fa3cfd05",
                    "version": "1.0.0",
                    "name": "GHP-TEST",
                    "description": "A credential issued according to GHP specification that indicates a persons test.",
                    "credentialSpec": "GHP",
                    "credentialSpecDisplayValue": "Good Health Pass",
                    "credentialCategory": "TEST",
                    "credentialCategoryDisplayValue": "Test",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a GHP test certificate based on the value in type field.",
                        "id": "9ce08db0-6eda-49eb-9338-fe080a1639d7",
                        "predicate": "{\"if\": [{\"in\": [\"TestCredential\", {\"var\": \"payload.type\"}]}, \"GHP-TEST\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved test",
                            "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since test is less then predefined value",
                            "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for negative test result",
                            "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.testResult\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "52c0d2fa-54eb-4b51-ab91-4979ee572de4",
                    "version": "1.0.0",
                    "name": "IDHP-VACCINATION",
                    "description": "A credential issued according to IDHP specification that indicates a persons vaccination.",
                    "credentialSpec": "IDHP",
                    "credentialSpecDisplayValue": "Digital Health Pass",
                    "credentialCategory": "VACCINATION",
                    "credentialCategoryDisplayValue": "Vaccination",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a IDHP vaccination certificate based on the value in type field.",
                        "id": "e1d4ca09-47a8-420d-96a6-9e612ab6baf4",
                        "predicate": "{\"if\": [{\"in\": [\"Vaccination\", {\"var\": \"payload.type\"}]}, \"IDHP-VACCINATION\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved vaccine",
                            "id": "a0295a42-fac0-489a-90bd-d07f9e70b481",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesUS\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.cvxCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.medicinalProductCode\"}, {\"var\": \"external.approvedVaccinesEU\"}]}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "053d0b98-506b-4e22-9228-d60f88dbb9c2",
                    "version": "1.0.0",
                    "name": "IDHP-TEST",
                    "description": "A credential issued according to IDHP specification that indicates a persons test.",
                    "credentialSpec": "IDHP",
                    "credentialSpecDisplayValue": "Digital Health Pass",
                    "credentialCategory": "TEST",
                    "credentialCategoryDisplayValue": "Test",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a IDHP test certificate based on the value in type field.",
                        "id": "150a71ee-0464-4ba6-b806-ee075a1d20a2",
                        "predicate": "{\"if\": [{\"in\": [\"Test\", {\"var\": \"payload.type\"}]}, \"IDHP-TEST\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check for approved test",
                            "id": "0464bfe4-97df-422c-9ef8-3b10ea4c69f6",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since test is less then predefined value",
                            "id": "dbfb7694-fe3f-4cfb-92bd-76b1c2195f0a",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-PCR\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-PCR\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursPCR.0\"}, \"hour\"]}]}]}, {\"and\": [{\"or\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTests-ANTIGEN\"}]}, {\"and\": [{\"in\": [{\"var\": \"payload.credentialSubject.testType\"}, {\"var\": \"external.approvedTestMethods-ANTIGEN\"}]}, {\"===\": [{\"var\": \"external.acceptTestMethodAsTestType.0\"}, \"true\"]}]}]}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"}, {\"var\": \"external.testValidityDurationHoursANTIGEN.0\"}, \"hour\"]}]}]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for negative test result",
                            "id": "e6749362-0ae3-4f01-a0e3-e44799e37e4b",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.testResult\"}, {\"var\": \"external.acceptedTestResults\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "61e73c18-4fda-488f-ba29-98044fe5eac5",
                    "version": "1.0.0",
                    "name": "IDHP-PASS",
                    "description": "A credential issued according to IDHP specification that indicates a persons pass.",
                    "credentialSpec": "IDHP",
                    "credentialSpecDisplayValue": "Digital Health Pass",
                    "credentialCategory": "PASS",
                    "credentialCategoryDisplayValue": "Pass",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a IDHP pass certificate based on the value in type field.",
                        "id": "cf6336bd-4ef2-4a01-8aec-1b63452b8665",
                        "predicate": "{\"if\": [{\"in\": [\"Pass\", {\"var\": \"payload.type\"}]}, \"IDHP-PASS\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since getting the pass is less then predefined value",
                            "id": "4f4fb938-0633-4af0-8c64-a785dc8f8a04",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, {\"var\": \"external.passValidityDurationHours.0\"}, \"hour\"]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check for a pass status",
                            "id": "75916ba4-16ec-48cc-b8c1-d808e269823e",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"in\": [{\"var\": \"payload.credentialSubject.status\"}, {\"var\": \"external.acceptedPassStatus\"}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "935803af-7933-4c7d-b699-52cf8e47700c",
                    "version": "1.0.0",
                    "name": "IDHP-TEMPERATURE",
                    "description": "A credential issued according to IDHP specification that indicates a persons temperature.",
                    "credentialSpec": "IDHP",
                    "credentialSpecDisplayValue": "Digital Health Pass",
                    "credentialCategory": "TEMPERATURE",
                    "credentialCategoryDisplayValue": "Temperature",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a IDHP temperature certificate based on the value in type field.",
                        "id": "1bae7641-9821-45e0-b11e-6b2d20a02613",
                        "predicate": "{\"if\": [{\"in\": [\"Temperature\", {\"var\": \"payload.type\"}]}, \"IDHP-TEMPERATURE\", false]}"
                    },
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "1.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "8d6b82c8-3e0e-4d40-b944-2a07acee453e"
                        }
                    ],
                    "rules": [
                        {
                            "version": "1.0.0",
                            "name": "Check that duration since taking the temperature is less then predefined value",
                            "id": "3fd0d331-9a67-46f5-8f1e-738535450352",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"external.validationClock\"}, 0, \"hour\"]}, {\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"}, {\"var\": \"external.temperatureValidityDurationHours.0\"}, \"hour\"]}]}, false]}"
                        },
                        {
                            "version": "1.0.0",
                            "name": "Check that the temperature is normal",
                            "id": "4b880223-815f-4bdd-bf74-c3e8e97bf70f",
                            "predicate": "{\"if\": [{\"var\": \"payload.credentialSubject\"}, {\"or\": [{\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.units\"}, \"C\"]}, {\"<\": [{\"var\": \"payload.credentialSubject.temperature\"}, {\"var\": \"external.normalTemperatureTresholdCelsius.0\"}]}]}, {\"and\": [{\"===\": [{\"var\": \"payload.credentialSubject.units\"}, \"F\"]}, {\"<\": [{\"var\": \"payload.credentialSubject.temperature\"}, {\"var\": \"external.normalTemperatureTresholdFahrenheit.0\"}]}]}]}, false]}"
                        }
                    ],
                    "trustLists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers registered in the EU Gateway",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "id": "0da135ae-19fc-4e19-a892-544c390cc650"
                        }
                    ]
                },
                {
                    "id": "0ea77c25-98cb-44d1-b5d9-51c7e152e884",
                    "version": "1.0.0",
                    "name": "CONSENT_RECEIPT",
                    "description": "CONSENT_RECEIPT - DES",
                    "credentialSpec": "CONSENT_RECEIPT",
                    "credentialSpecDisplayValue": "Consent Receipt",
                    "credentialCategory": "GENERIC",
                    "credentialCategoryDisplayValue": "Generic",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a CONSENT_RECEIPT generic certificate based on the schema",
                        "id": "e737510e-5761-487b-a826-e6c6832d3b35",
                        "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.consentId\"}, {\"var\": \"payload.proof\"}]}, \"CONSENT_RECEIPT\", false]}"
                    },
                    "metrics": [
                        {
                            "countBy": {
                                "extract": true,
                                "scan": true,
                                "scanResult": true
                            },
                            "extract": {},
                            "name": "Extract nothing"
                        }
                    ],
                    "display": [],
                    "rules": [],
                    "trustLists": []
                },
                {
                    "id": "b7115b5b-aae4-4c3f-b838-4beb823e3033",
                    "version": "1.0.0",
                    "name": "CONSENT_REVOKE",
                    "description": "CONSENT_REVOKE - DES",
                    "credentialSpec": "CONSENT_REVOKE",
                    "credentialSpecDisplayValue": "Consent Revoke",
                    "credentialCategory": "GENERIC",
                    "credentialCategoryDisplayValue": "Generic",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a CONSENT_REVOKE generic certificate based on the schema",
                        "id": "34b26f53-959f-4ba3-93ac-ccb600f0d46c",
                        "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.consentRevokeId\"}, {\"var\": \"payload.proof\"}]}, \"CONSENT_REVOKE\", false]}"
                    },
                    "metrics": [
                        {
                            "countBy": {
                                "extract": true,
                                "scan": true,
                                "scanResult": true
                            },
                            "extract": {},
                            "name": "Extract nothing"
                        }
                    ],
                    "display": [],
                    "rules": [],
                    "trustLists": []
                },
                {
                    "id": "fb825240-bd64-4289-93e4-4540d37c7faf",
                    "version": "1.0.0",
                    "name": "ID",
                    "description": "ID - DES",
                    "credentialSpec": "ID",
                    "credentialSpecDisplayValue": "Identifier",
                    "credentialCategory": "GENERIC",
                    "credentialCategoryDisplayValue": "Generic",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a ID generic certificate based on value in credentialSubject.type field",
                        "id": "f1347326-a020-4f67-b912-c71c7a888371",
                        "predicate": "{\"if\": [{\"===\": [{\"var\": \"payload.credentialSubject.type\"}, \"id\"]}, \"ID\", false]}"
                    },
                    "metrics": [
                        {
                            "countBy": {
                                "extract": true,
                                "scan": true,
                                "scanResult": true
                            },
                            "extract": {},
                            "name": "Extract nothing"
                        }
                    ],
                    "display": [],
                    "rules": [],
                    "trustLists": []
                },
                {
                    "id": "ff4bcd3c-713a-4d1e-b7ab-5e0575fee447",
                    "version": "1.0.0",
                    "name": "COS_ACCESS",
                    "description": "COS_ACCESS - DES",
                    "credentialSpec": "COS_ACCESS",
                    "credentialSpecDisplayValue": "COS Access",
                    "credentialCategory": "GENERIC",
                    "credentialCategoryDisplayValue": "Generic",
                    "classifierRule": {
                        "version": "1.0.0",
                        "name": "Classifies a COS_ACCESS generic certificate based on the schema",
                        "id": "0416ecc3-3760-4cac-aa7a-37325c9dd6fc",
                        "predicate": "{\"if\": [{\"and\": [{\"var\": \"payload.cosAccess\"}, {\"var\": \"payload.cosAccess.proof\"}]}, \"COS_ACCESS\", false]}"
                    },
                    "metrics": [
                        {
                            "countBy": {
                                "extract": true,
                                "scan": true,
                                "scanResult": true
                            },
                            "extract": {},
                            "name": "Extract nothing"
                        }
                    ],
                    "display": [],
                    "rules": [],
                    "trustLists": []
                }
            ],
            "valueSets": [
                {
                    "version": "1.0.0",
                    "name": "temperatureValidityDurationHours",
                    "description": "Number of hours since the temperature credential was issued within which is is valid",
                    "items": [
                        {
                            "value": "12",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "377b06f4-16d7-4791-b42b-ef9d0655bcf1"
                },
                {
                    "version": "1.0.0",
                    "name": "normalTemperatureTresholdCelsius",
                    "description": "Treshold of normal temperature (C)",
                    "items": [
                        {
                            "value": "37.5",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "1804e710-4b1b-488d-93de-ebd750119f06"
                },
                {
                    "version": "1.0.0",
                    "name": "normalTemperatureTresholdFahrenheit",
                    "description": "Treshold of normal temperature (F)",
                    "items": [
                        {
                            "value": "100.4",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "8900dd0a-ed76-4a25-9129-865ef3374e76"
                },
                {
                    "version": "1.0.0",
                    "name": "acceptedPassStatus",
                    "description": "Accepted statuses of the issued pass credential",
                    "items": [
                        {
                            "value": "pass",
                            "description": ""
                        }
                    ],
                    "maxItems": 0,
                    "id": "7fc29a62-1f96-4825-90f8-29ec9addee32"
                },
                {
                    "version": "1.0.0",
                    "name": "passValidityDurationHours",
                    "description": "Number of hours since the pass was issued within which the pass valid",
                    "items": [
                        {
                            "value": "24",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "bb6254a7-84f4-4ca7-9db2-9e634c56a5a0"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedTests-ANTIGEN",
                    "description": "List of LOINC codes for ANTIGEN approved tests used for test verification",
                    "source": {
                        "url": "https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1114.9?_format=json",
                        "documentation": "https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1114.9/expansion",
                        "sourceType": "json",
                        "comments": "ANTIGEN test LOINC codes retrieved from source (filtered using description)",
                        "queries": [
                            {
                                "queryTool": "jmespath",
                                "expression": "compose.include[0].concept[?contains(display, 'Immunoassay') || contains(display, 'immunoassay') || contains(display, ' Ab ')].code"
                            },
                            {
                                "queryTool": "jq",
                                "expression": ".compose.include[0].concept[] | select (.display | ascii_downcase | contains(\"immunoassay\") or contains(\" ab \")) | .code"
                            },
                            {
                                "queryTool": "jsonpath",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "94503-0",
                            "description": ""
                        },
                        {
                            "value": "94504-8",
                            "description": ""
                        },
                        {
                            "value": "94507-1",
                            "description": ""
                        },
                        {
                            "value": "94508-9",
                            "description": ""
                        },
                        {
                            "value": "94547-7",
                            "description": ""
                        },
                        {
                            "value": "94558-4",
                            "description": ""
                        },
                        {
                            "value": "94562-6",
                            "description": ""
                        },
                        {
                            "value": "94563-4",
                            "description": ""
                        },
                        {
                            "value": "94564-2",
                            "description": ""
                        },
                        {
                            "value": "94661-6",
                            "description": ""
                        },
                        {
                            "value": "94761-4",
                            "description": ""
                        },
                        {
                            "value": "94762-2",
                            "description": ""
                        },
                        {
                            "value": "95209-3",
                            "description": ""
                        },
                        {
                            "value": "95416-4",
                            "description": ""
                        },
                        {
                            "value": "95542-7",
                            "description": ""
                        }
                    ],
                    "maxItems": 0,
                    "id": "3f5c62ec-3b52-426f-815f-cc087c4e99e2"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedVaccinesUS",
                    "description": "List of CDC CVX codes for approved vaccines used for vaccination verification",
                    "source": {
                        "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                        "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                        "sourceType": "xml",
                        "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward  immunity in US' in Notes field and code not equal to 500",
                        "queries": [
                            {
                                "queryTool": "xpath",
                                "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                            },
                            {
                                "queryTool": "lxml",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "207",
                            "description": "Spikevax (Moderna)"
                        },
                        {
                            "value": "208",
                            "description": "Comirnaty (Pfizer-BioNTech)"
                        },
                        {
                            "value": "210",
                            "description": "Vaxzevria (AstraZeneca)"
                        },
                        {
                            "value": "212",
                            "description": "Janssen"
                        },
                        {
                            "value": "217",
                            "description": "Comirnaty (Pfizer-BioNTech) 12 to 18 years"
                        },
                        {
                            "value": "218",
                            "description": "Comirnaty (Pfizer-BioNTech) 5 to 12 years"
                        },
                        {
                            "value": "219",
                            "description": "Comirnaty (Pfizer-BioNTech) 6 months to 5 years"
                        },
                        {
                            "value": "502",
                            "description": "Covaxin (Bharat Biotech)"
                        },
                        {
                            "value": "510",
                            "description": "Covilo/BIBP (Sinopharm)"
                        },
                        {
                            "value": "511",
                            "description": "CoronaVac (Sinovac)"
                        }
                    ],
                    "maxItems": 0,
                    "id": "1a7e7f2d-cc6b-4c21-91e7-05e2f04c90e9"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedVaccinesUSSingleDose",
                    "description": "List of CDC CVX codes for approved SINGLE DOSE vaccines used for vaccination verification",
                    "source": {
                        "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                        "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                        "sourceType": "xml",
                        "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward immunity in US' in Notes field and contain '1-dose vaccine' in Notes field and code not equal to 500",
                        "queries": [
                            {
                                "queryTool": "xpath",
                                "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and contains(Notes/text(), '1-dose vaccine') and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                            },
                            {
                                "queryTool": "lxml",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "212",
                            "description": "Janssen"
                        }
                    ],
                    "maxItems": 0,
                    "id": "34c6b294-0028-4c7f-9827-995d22f245b0"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedTests-PCR",
                    "description": "List of LOINC codes for PCR approved tests used for test verification",
                    "source": {
                        "url": "https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1114.9?_format=json",
                        "documentation": "https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1114.9/expansion",
                        "sourceType": "json",
                        "comments": "PCR test LOINC codes retrieved from source (filtered using description)",
                        "queries": [
                            {
                                "queryTool": "jmespath",
                                "expression": "compose.include[0].concept[?contains(display, 'NAA') || contains(display, 'Nucleic acid amplification') || contains(display, 'Sequencing')].code"
                            },
                            {
                                "queryTool": "jq",
                                "expression": ".compose.include[0].concept[] | select (.display | ascii_downcase | contains(\"naa\") or contains(\"nucleic acid amplification\") or contains(\"sequencing\")) | .code"
                            },
                            {
                                "queryTool": "jsonpath",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "50548-7",
                            "description": ""
                        },
                        {
                            "value": "68993-5",
                            "description": ""
                        },
                        {
                            "value": "82159-5",
                            "description": ""
                        },
                        {
                            "value": "94306-8",
                            "description": ""
                        },
                        {
                            "value": "94307-6",
                            "description": ""
                        },
                        {
                            "value": "94308-4",
                            "description": ""
                        },
                        {
                            "value": "94309-2",
                            "description": ""
                        },
                        {
                            "value": "94500-6",
                            "description": ""
                        },
                        {
                            "value": "94502-2",
                            "description": ""
                        },
                        {
                            "value": "94531-1",
                            "description": ""
                        },
                        {
                            "value": "94533-7",
                            "description": ""
                        },
                        {
                            "value": "94534-5",
                            "description": ""
                        },
                        {
                            "value": "94559-2",
                            "description": ""
                        },
                        {
                            "value": "94565-9",
                            "description": ""
                        },
                        {
                            "value": "94640-0",
                            "description": ""
                        },
                        {
                            "value": "94756-4",
                            "description": ""
                        },
                        {
                            "value": "94757-2",
                            "description": ""
                        },
                        {
                            "value": "94758-0",
                            "description": ""
                        },
                        {
                            "value": "94759-8",
                            "description": ""
                        },
                        {
                            "value": "94760-6",
                            "description": ""
                        },
                        {
                            "value": "94764-8",
                            "description": ""
                        },
                        {
                            "value": "94845-5",
                            "description": ""
                        },
                        {
                            "value": "95406-5",
                            "description": ""
                        },
                        {
                            "value": "95409-9",
                            "description": ""
                        },
                        {
                            "value": "95423-0",
                            "description": ""
                        },
                        {
                            "value": "95424-8",
                            "description": ""
                        },
                        {
                            "value": "95425-5",
                            "description": ""
                        },
                        {
                            "value": "95608-6",
                            "description": ""
                        },
                        {
                            "value": "95609-4",
                            "description": ""
                        }
                    ],
                    "maxItems": 0,
                    "id": "d079dfb8-bdb5-4613-88e9-e1d15b851340"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedVaccinesUSDoubleDose",
                    "description": "List of CDC CVX codes for approved DOUBLE DOSE vaccines used for vaccination verification",
                    "source": {
                        "url": "https://www2a.cdc.gov/vaccines/iis/iisstandards/XML2.asp?rpt=cvx",
                        "documentation": "https://www.cdc.gov/vaccines/programs/iis/COVID-19-related-codes.html",
                        "sourceType": "xml",
                        "comments": "Vaccine codes retrieved from source which have 'COVID-19' in ShortDescription field and with 'Active' or 'Non-Us' in Status field and does not have 'not counted toward immunity in US' in Notes field and does not contain '1-dose vaccine' in Notes field and code not equal to 500",
                        "queries": [
                            {
                                "queryTool": "xpath",
                                "expression": "/CVXCodes/CVXInfo[contains(ShortDescription/text(), 'COVID-19') and (Status='Active' or Status='Non-US') and not(contains(normalize-space(Notes/text()), 'not counted toward immunity in US')) and not(contains(Notes/text(), '1-dose vaccine')) and normalize-space(CVXCode/text()) != '500']/CVXCode/text()"
                            },
                            {
                                "queryTool": "lxml",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "207",
                            "description": "Spikevax (Moderna)"
                        },
                        {
                            "value": "208",
                            "description": "Comirnaty (Pfizer-BioNTech)"
                        },
                        {
                            "value": "210",
                            "description": "Vaxzevria (AstraZeneca)"
                        },
                        {
                            "value": "217",
                            "description": "Comirnaty (Pfizer-BioNTech) 12 to 18 years"
                        },
                        {
                            "value": "218",
                            "description": "Comirnaty (Pfizer-BioNTech) 5 to 12 years"
                        },
                        {
                            "value": "219",
                            "description": "Comirnaty (Pfizer-BioNTech) 6 months to 5 years"
                        },
                        {
                            "value": "502",
                            "description": "Covaxin (Bharat Biotech)"
                        },
                        {
                            "value": "510",
                            "description": "Covilo/BIBP (Sinopharm)"
                        },
                        {
                            "value": "511",
                            "description": "CoronaVac (Sinovac)"
                        }
                    ],
                    "maxItems": 0,
                    "id": "f9014c95-2352-4a9f-ad31-6dab36bd030a"
                },
                {
                    "version": "1.0.0",
                    "name": "requireBooster",
                    "description": "Indication whether a vaccination credential is checked for booster. Only booster vaccination is accepted if set to 'true'.",
                    "items": [
                        {
                            "value": "true",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "8fee1e9c-cb47-441a-97a0-d06f25748982"
                },
                {
                    "version": "1.0.0",
                    "name": "vaccinationValidAfterDaysBOOSTER",
                    "description": "Number of days since the vaccination after which the vaccination is valid",
                    "items": [
                        {
                            "value": "0",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "1d573eb1-2e7a-4ebd-9656-145ee40f3df2"
                },
                {
                    "version": "1.0.0",
                    "name": "testValidityDurationHoursPCR",
                    "description": "Number of hours since the PCR test within which the test result is valid",
                    "items": [
                        {
                            "value": "72",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "2f9a57d3-a549-4f4e-aca3-27d81741a2bc"
                },
                {
                    "version": "1.0.0",
                    "name": "vaccinationValidityDurationDays",
                    "description": "The duration of the vaccination validity in days",
                    "items": [
                        {
                            "value": "270",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "1539d577-29b9-4dc1-817d-280df00872b8"
                },
                {
                    "version": "1.0.0",
                    "name": "acceptedTestResults",
                    "description": "List of SNOMED codes for accepted test results indicating a negative COVID-19 test (virus not found)",
                    "items": [
                        {
                            "value": "Not detected",
                            "description": ""
                        },
                        {
                            "value": "260415000",
                            "description": ""
                        }
                    ],
                    "maxItems": 0,
                    "id": "6d51877c-454e-4304-83d1-a4c360e3b412"
                },
                {
                    "version": "1.0.0",
                    "name": "vaccinationValidityDurationDaysBOOSTER",
                    "description": "The duration of the vaccination validity in days",
                    "items": [
                        {
                            "value": "999",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "47bdcc2d-349e-4798-8c9a-a316397cd1ab"
                },
                {
                    "version": "1.0.0",
                    "name": "vaccinationValidAfterDays",
                    "description": "Number of days since the vaccination after which the vaccination is valid",
                    "items": [
                        {
                            "value": "14",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "f9658430-b373-402a-be4a-d1259eea69cf"
                },
                {
                    "version": "1.0.0",
                    "name": "testValidityDurationHoursANTIGEN",
                    "description": "Number of hours since the ANTIGEN test within which the test result is valid",
                    "items": [
                        {
                            "value": "48",
                            "description": ""
                        }
                    ],
                    "maxItems": 1,
                    "id": "0ba0316f-17d4-4c5d-8b3f-0fb2bccc5a42"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedTestMethods-PCR",
                    "description": "List of PRC LOINC codes for approved PCR test methods used for test verification",
                    "source": {
                        "url": "",
                        "documentation": "https://covid-19-diagnostics.jrc.ec.europa.eu/devices?manufacturer&text_name&marking&rapid_diag&format&target_type&field-1=HSC%20common%20list%20%28RAT%29&value-1=1&search_method=AND#form_content",
                        "sourceType": "",
                        "comments": "",
                        "queries": []
                    },
                    "items": [
                        {
                            "value": "LP6464-4",
                            "description": "Nucleic acid amplification with probe detection"
                        }
                    ],
                    "maxItems": 0,
                    "id": "c5211393-646a-496d-a981-1127b1e4f02b"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedDiseases",
                    "description": "List of SNOMED codes for approved diseases or agents indicating COVID-19 (for purpose of recovery certificate verification)",
                    "items": [
                        {
                            "value": "840539006",
                            "description": "Disease caused by 2019 novel coronavirus"
                        }
                    ],
                    "maxItems": 0,
                    "id": "f3d46ce9-acfe-491e-8f1a-65cf50a87e32"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedTestMethods-ANTIGEN",
                    "description": "List of LOINC codes for approved ANTIGEN test methods used for test verification",
                    "source": {
                        "url": "",
                        "documentation": "https://covid-19-diagnostics.jrc.ec.europa.eu/devices?manufacturer&text_name&marking&rapid_diag&format&target_type&field-1=HSC%20common%20list%20%28RAT%29&value-1=1&search_method=AND#form_content",
                        "sourceType": "",
                        "comments": "",
                        "queries": []
                    },
                    "items": [
                        {
                            "value": "LP217198-3",
                            "description": "Rapid immunoassay"
                        }
                    ],
                    "maxItems": 0,
                    "id": "90fc8d33-dbec-4588-9844-67a3fe9f3380"
                },
                {
                    "version": "1.0.0",
                    "name": "approvedVaccinesEU",
                    "description": "List of EU issued license numbers for approved vaccines used for vaccination verification",
                    "source": {
                        "url": "https://ec.europa.eu/health/documents/community-register/ods/ods_products.json",
                        "documentation": "https://www.ema.europa.eu/en/human-regulatory/overview/public-health-threats/coronavirus-disease-covid-19/treatments-vaccines/vaccines-covid-19/covid-19-vaccines-authorised",
                        "sourceType": "json",
                        "comments": "",
                        "queries": [
                            {
                                "queryTool": "jsonpath",
                                "expression": ""
                            }
                        ]
                    },
                    "items": [
                        {
                            "value": "EU/1/20/1528",
                            "description": "Comirnaty (Pfizer-BioNTech)"
                        },
                        {
                            "value": "EU/1/20/1507",
                            "description": "Spikevax (Moderna)"
                        },
                        {
                            "value": "EU/1/21/1529",
                            "description": "Vaxzevria (AstraZeneca)"
                        },
                        {
                            "value": "EU/1/20/1525",
                            "description": "Janssen"
                        },
                        {
                            "value": "EU/1/21/1618",
                            "description": "Nuvaxovid (Novavax)"
                        }
                    ],
                    "maxItems": 0,
                    "id": "e3307d04-152f-4cd8-b4c9-6d4a5d5d1c53"
                }
            ],
            "disabledSpecifications": [],
            "disabledRules": []
        },
        {
            "id": "976731ac-9e46-11ec-b909-0242ac120002",
            "version": "1.0.0",
            "name": "CUSTOM-PLUGIN",
            "description": "A custom plugin",
            "credentialSpec": "CUSTOM",
            "credentialSpecDisplayValue": "CUSTOM",
            "credentialCategory": "CUSTOM",
            "credentialCategoryDisplayValue": "CUSTOM",
            "classifierRule": {
                "version": "1.0.0",
                "name": "Custom plugin for unit test.",
                "id": "9f0d22c2-9e46-11ec-b909-0242ac120002",
                "predicate": "{\"if\": [{\"in\": [\"GoodTestVerifier\", {\"var\": \"payload.type\"}]}, \"CUSTOM\", false]}"
            },
            "metrics": [
                {
                    "name": "Counts verifications by result, issuer, type",
                    "extract": {
                        "issuerDID": "issuer",
                        "credentialType": "type.2"
                    },
                    "countBy": {
                        "scan": true,
                        "scanResult": true,
                        "extract": true
                    }
                }
            ],
            "display": [],
            "rules": [],
            "trustLists": []
        }
    ]
};

// eslint-disable-next-line max-lines-per-function
const getVerifierConfigPayloadPartial = {
    "type": "verifier-configuration",
    "payload": [
        {
            "id": "3e9b52cb-3177-4957-ab82-0384090637f6",
            "created_by": "hpass.default_verifier",
            "created_at": "2022-03-04T17:24:25Z",
            "updated_at": "2022-03-04T17:24:25Z",
            "version": "1.0.0",
            "name": "[NEW MODEL] Complete ruleset",
            "offline": false,
            "refresh": 86400,
            "masterCatalog": true,
            "specificationConfigurations": [
                {
                    "id": "d176d25b-f9d1-4a41-80d4-8c298b244b8b",
                    "version": "latest"
                },
                {
                    "id": "aa48aecf-3ff7-44f2-96f8-23cf296453cb",
                    "version": "latest"
                },
                {
                    "id": "59ed37c8-ee7b-4c12-b46d-c396f1925cc5",
                    "version": "latest"
                },
                {
                    "id": "0fe78927-d30e-4379-8811-702e2f8effc4",
                    "version": "latest"
                },
                {
                    "id": "5142acea-53bd-4b95-a742-7c7212767d42",
                    "version": "latest"
                },
                {
                    "id": "ce524989-058a-483f-8e7f-5d264d0bdd55",
                    "version": "latest"
                },
                {
                    "id": "459d55a6-09d5-46b3-bbf0-2cfd47dc601f",
                    "version": "latest"
                },
                {
                    "id": "d41004be-bd00-4ecb-8ec9-82f9fa3cfd05",
                    "version": "latest"
                },
                {
                    "id": "52c0d2fa-54eb-4b51-ab91-4979ee572de4",
                    "version": "latest"
                },
                {
                    "id": "053d0b98-506b-4e22-9228-d60f88dbb9c2",
                    "version": "latest"
                },
                {
                    "id": "61e73c18-4fda-488f-ba29-98044fe5eac5",
                    "version": "latest"
                },
                {
                    "id": "935803af-7933-4c7d-b699-52cf8e47700c",
                    "version": "latest"
                },
                {
                    "id": "0ea77c25-98cb-44d1-b5d9-51c7e152e884",
                    "version": "latest"
                },
                {
                    "id": "b7115b5b-aae4-4c3f-b838-4beb823e3033",
                    "version": "latest"
                },
                {
                    "id": "fb825240-bd64-4289-93e4-4540d37c7faf",
                    "version": "latest"
                },
                {
                    "id": "ff4bcd3c-713a-4d1e-b7ab-5e0575fee447",
                    "version": "latest"
                }
            ],
            "valueSets": [
                {
                    "id": "377b06f4-16d7-4791-b42b-ef9d0655bcf1",
                    "version": "latest"
                },
                {
                    "id": "1804e710-4b1b-488d-93de-ebd750119f06",
                    "version": "latest"
                },
                {
                    "id": "8900dd0a-ed76-4a25-9129-865ef3374e76",
                    "version": "latest"
                },
                {
                    "id": "7fc29a62-1f96-4825-90f8-29ec9addee32",
                    "version": "latest"
                },
                {
                    "id": "bb6254a7-84f4-4ca7-9db2-9e634c56a5a0",
                    "version": "latest"
                },
                {
                    "id": "3f5c62ec-3b52-426f-815f-cc087c4e99e2",
                    "version": "latest"
                },
                {
                    "id": "1a7e7f2d-cc6b-4c21-91e7-05e2f04c90e9",
                    "version": "latest"
                },
                {
                    "id": "34c6b294-0028-4c7f-9827-995d22f245b0",
                    "version": "latest"
                },
                {
                    "id": "d079dfb8-bdb5-4613-88e9-e1d15b851340",
                    "version": "latest"
                },
                {
                    "id": "f9014c95-2352-4a9f-ad31-6dab36bd030a",
                    "version": "latest"
                },
                {
                    "id": "8fee1e9c-cb47-441a-97a0-d06f25748982",
                    "version": "latest"
                },
                {
                    "id": "1d573eb1-2e7a-4ebd-9656-145ee40f3df2",
                    "version": "latest"
                },
                {
                    "id": "2f9a57d3-a549-4f4e-aca3-27d81741a2bc",
                    "version": "latest"
                },
                {
                    "id": "1539d577-29b9-4dc1-817d-280df00872b8",
                    "version": "latest"
                },
                {
                    "id": "6d51877c-454e-4304-83d1-a4c360e3b412",
                    "version": "latest"
                },
                {
                    "id": "47bdcc2d-349e-4798-8c9a-a316397cd1ab",
                    "version": "latest"
                },
                {
                    "id": "f9658430-b373-402a-be4a-d1259eea69cf",
                    "version": "latest"
                },
                {
                    "id": "0ba0316f-17d4-4c5d-8b3f-0fb2bccc5a42",
                    "version": "latest"
                },
                {
                    "id": "c5211393-646a-496d-a981-1127b1e4f02b",
                    "version": "latest"
                },
                {
                    "id": "f3d46ce9-acfe-491e-8f1a-65cf50a87e32",
                    "version": "latest"
                },
                {
                    "id": "90fc8d33-dbec-4588-9844-67a3fe9f3380",
                    "version": "latest"
                },
                {
                    "id": "e3307d04-152f-4cd8-b4c9-6d4a5d5d1c53",
                    "version": "latest"
                }
            ],
            "disabledSpecifications": [],
            "disabledRules": []
        }
    ]
};

// eslint-disable-next-line max-lines-per-function
const getVerifierConfigPayloadDeprecated = {
    "type": "verifier-configuration-content-collection",
    "payload": [
        {
            "id": "3e9b52cb-3177-4957-ab82-0384090637f6",
            "created_by": "hpass.default_verifier",
            "created_at": "2021-09-28T12:54:29Z",
            "updated_at": "2021-09-28T12:54:29Z",
            "version": "2.0.8",
            "unrestricted": true,
            "name": "Complete ruleset 1 (for supported credential types), expiration check (for unsupported types)",
            "customer": "IBM",
            "customerId": "IBM",
            "organization": "IBM",
            "organizationId": "IBM",
            "label": "Digital Health Pass Catalog",
            "offline": false,
            "refresh": 86400,
            "verifierType": "Organization",
            "configuration": {
                "IDHP": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "2.0.1",
                            "name": "Display only minimum identity (name, date of birth)",
                            "customerId": "IBM",
                            "type": "IDHP",
                            "category": "generic",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "cc354dd0-2a8b-456c-a3eb-dde94194c60e"
                        }
                    ],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": [
                        {
                            "id": "a40aef96-f956-4101-a26a-dca03b60806f",
                            "version": "3.0.1",
                            "name": "Perform required credential checks",
                            "type": "IDHP",
                            "category": "generic",
                            "rules": [
                                {
                                    "version": "2.0.2",
                                    "name": "Ensure its a supported credential",
                                    "predicate": "{\"if\":[{\"or\":[{\"in\":[\"Vaccination\",{\"var\":\"payload.type\"}]},{\"in\":[\"Test\",{\"var\":\"payload.type\"}]},{\"in\":[\"Temperature\",{\"var\":\"payload.type\"}]},{\"in\":[\"Pass\",{\"var\":\"payload.type\"}]}]},true,\"unknown\"]}",
                                    "type": "IDHP",
                                    "category": "generic",
                                    "id": "2c638c39-6568-40f7-a9ad-3a4cceb7908d"
                                },
                                {
                                    "version": "2.0.2",
                                    "name": "Check the credential is not expired",
                                    "predicate": "{\"if\":[{\"var\":\"payload.expirationDate\"},{\"not-after\":[{\"plusTime\":[{\"var\":\"external.validationClock\"},0,\"day\"]},{\"plusTime\":[{\"var\":\"payload.expirationDate\"},0,\"day\"]}]}, true]}",
                                    "type": "VC",
                                    "category": "generic",
                                    "id": "b7b9b663-080e-41ac-96dd-1109d8c09f9d"
                                }
                            ]
                        },
                        {
                            "id": "869546c8-816b-4d85-9fd7-1728ecb8c7c1",
                            "version": "2.0.2",
                            "name": "Verify a Vaccination (signature w/ rules)",
                            "type": "IDHP",
                            "category": "vaccination",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Check it is 14 to 365 days since getting the vaccination",
                                    "predicate": "{\"if\": [{\"in\": [\"Vaccination\",{\"var\": \"payload.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"},14,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfVaccination\"},365,\"day\"]}]}, true]}",
                                    "type": "IDHP",
                                    "category": "vaccination",
                                    "id": "e4cc69fc-d18c-4f5a-b149-6b71dfd8c5ef"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for approved vaccine",
                                    "predicate": "{\"if\":[{\"in\":[\"Vaccination\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.medicinalProductCode\"},[\"207\",\"208\",\"210\",\"212\"]]},true]}",
                                    "type": "IDHP",
                                    "category": "vaccination",
                                    "id": "f510ebfa-29ee-4b21-a8b9-bae4a39fd873"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for completed vaccination cycle",
                                    "predicate": "{\"if\":[{\"in\":[\"Vaccination\",{\"var\":\"payload.type\"}]},{\">=\":[{\"var\":\"payload.credentialSubject.doseNumber\"},{\"var\":\"payload.credentialSubject.dosesPerCycle\"}]},true]}",
                                    "type": "IDHP",
                                    "category": "vaccination",
                                    "id": "9f40f334-13bc-4eb3-8afe-04e15ff4db95"
                                }
                            ]
                        },
                        {
                            "id": "1eb7449a-19b6-48f0-9b47-f929b0903793",
                            "version": "2.0.3",
                            "name": "Verify a Test (signature w/ rules)",
                            "type": "IDHP",
                            "category": "test",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Check it is less than 72 hours since getting the test",
                                    "predicate": "{\"if\": [{\"in\": [\"Test\",{\"var\": \"payload.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"},72,\"hour\"]}]}, true]}",
                                    "type": "IDHP",
                                    "category": "test",
                                    "id": "964f8d1c-2f43-4c79-b7a7-c76dae23166e"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for negative test result",
                                    "predicate": "{\"if\": [{\"in\": [\"Test\",{\"var\": \"payload.type\"}]},{\"===\": [{\"var\": \"payload.credentialSubject.testResult\"},\"Not detected\"]}, true]}",
                                    "type": "IDHP",
                                    "category": "test",
                                    "id": "061c04e2-c773-4193-98f4-cda8dd3cc2e2"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for approved test",
                                    "predicate": "{\"if\":[{\"in\":[\"Test\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.testType\"},[\"50548-7\",\"68993-5\",\"82159-5\",\"94306-8\",\"94307-6\",\"94308-4\",\"94309-2\",\"94500-6\",\"94502-2\",\"94503-0\",\"94504-8\",\"94507-1\",\"94508-9\",\"94531-1\",\"94533-7\",\"94534-5\",\"94547-7\",\"94558-4\",\"94559-2\",\"94562-6\"]]},true]}",
                                    "type": "IDHP",
                                    "category": "test",
                                    "id": "d4c09ae0-7653-4701-8cbb-6ad2847408d8"
                                }
                            ]
                        },
                        {
                            "id": "54b3bf7d-ca84-45dc-a391-25bf7a80b998",
                            "version": "2.0.1",
                            "name": "Verify a Temperature Scan (signature w/ rules)",
                            "type": "IDHP",
                            "category": "temperature",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Check it is less than 12 hours since taking the temperature",
                                    "predicate": "{\"if\": [{\"in\": [\"Temperature\",{\"var\": \"payload.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"},12,\"hour\"]}]}, true]}",
                                    "type": "IDHP",
                                    "category": "temperature",
                                    "id": "d4ebc3c4-1287-42a4-87d8-4a625c70f66c"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check that the temperature is normal (F)",
                                    "predicate": "{\"if\":[{\"and\":[{\"in\":[\"Temperature\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.units\"},[\"F\"]]}]},{\"<\":[{\"var\":\"payload.credentialSubject.temperature\"},100.4]},true]}",
                                    "type": "IDHP",
                                    "category": "temperature",
                                    "id": "1fb34600-6da9-43fe-b36c-0d8cdb5ff5dc"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check that the temperature is normal (C)",
                                    "predicate": "{\"if\":[{\"and\":[{\"in\":[\"Temperature\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.units\"},[\"F\"]]}]},{\"<\":[{\"var\":\"payload.credentialSubject.temperature\"},37.5]},true]}",
                                    "type": "IDHP",
                                    "category": "temperature",
                                    "id": "c580b864-88f6-49d7-9c47-67d0545bd194"
                                }
                            ]
                        },
                        {
                            "id": "c8d65505-c403-4210-b1eb-b6fb8aec3399",
                            "version": "2.0.0",
                            "name": "Verify a Pass (signature w/ rules)",
                            "type": "IDHP",
                            "category": "pass",
                            "rules": [
                                {
                                    "version": "2.0.0",
                                    "name": "Check it is less than 24 hours since getting the pass",
                                    "predicate": "{\"if\": [{\"in\": [\"Pass\",{\"var\": \"payload.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.credentialSubject.date\"},24,\"hour\"]}]}, true]}",
                                    "type": "IDHP",
                                    "category": "pass",
                                    "id": "6bd99d01-0425-4dd0-bacb-fa626faa6ab0"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for a pass status",
                                    "predicate": "{\"if\": [{\"in\": [\"Pass\",{\"var\": \"payload.type\"}]},{\"===\": [{\"var\": \"payload.credentialSubject.status\"},\"pass\"]}, true]}",
                                    "type": "IDHP",
                                    "category": "pass",
                                    "id": "0fc97f64-e173-4a3e-98f1-2997cb385ce8"
                                }
                            ]
                        }
                    ]
                },
                "DCC": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer",
                            "extract": {
                                "issuerDID": "*[0].is"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "2.0.3",
                            "name": "Display only minimum identity (name, date of birth)",
                            "customerId": "IBM",
                            "type": "DCC",
                            "category": "generic",
                            "fields": [
                                {
                                    "field": "nam.gn",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "nam.fn",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "dob",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "ac85615b-1bbf-4a51-b637-d614df0100fd"
                        }
                    ],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": [
                        {
                            "id": "825c6cd0-9133-45bf-a74c-bbe00e9a4b5c",
                            "version": "2.0.0",
                            "name": "Perform required credential checks",
                            "type": "DCC",
                            "category": "generic",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Ensure its a supported credential",
                                    "predicate": "{\"if\":[{\"or\":[{\"var\":\"payload.v.0\"},{\"var\":\"payload.t.0\"},{\"var\":\"payload.r.0\"}]}, true, false]}",
                                    "type": "DCC",
                                    "category": "generic",
                                    "id": "db382c67-1e83-48ac-8025-08549760927a"
                                }
                            ]
                        },
                        {
                            "id": "781db41b-9512-4261-a789-d253887a8e25",
                            "version": "2.0.1",
                            "name": "Verify a Vaccination (signature w/ rules)",
                            "type": "DCC",
                            "category": "vaccination",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Check it is 14 to 365 days since getting the vaccination",
                                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.v.0.dt\"},14,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.v.0.dt\"},365,\"day\"]}]}, true]}",
                                    "type": "DCC",
                                    "category": "vaccination",
                                    "id": "bdc63070-4149-4dac-90cf-d8204fc1cdaa"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for approved vaccine",
                                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"},{\"in\": [{\"var\": \"payload.v.0.mp\"},[\"EU/1/20/1528\",\"EU/1/20/1507\",\"EU/1/21/1529\",\"EU/1/20/1525\"]]}, true]}",
                                    "type": "DCC",
                                    "category": "vaccination",
                                    "id": "bae77b15-382a-4a2a-b15e-16d85bd79a87"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for single vaccination record",
                                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"},{\"!\": [{\"var\": \"payload.v.1\"}]}, true]}",
                                    "type": "DCC",
                                    "category": "vaccination",
                                    "id": "07bad43c-ff7e-4eac-a951-9152e07d951f"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for completed vaccination cycle",
                                    "predicate": "{\"if\": [{\"var\": \"payload.v.0\"},{\">=\": [{\"var\": \"payload.v.0.dn\"},{\"var\": \"payload.v.0.sd\"}]}, true]}",
                                    "type": "DCC",
                                    "category": "vaccination",
                                    "id": "1edb7c1f-effb-46fa-a337-4a0ca33fdcfb"
                                }
                            ]
                        },
                        {
                            "id": "d7b98c72-3160-43e2-b3d5-cc5d6d3d1059",
                            "version": "2.0.1",
                            "name": "Verify a Test (signature w/ rules including 72 hour check)",
                            "type": "DCC",
                            "category": "test",
                            "rules": [
                                {
                                    "version": "2.0.1",
                                    "name": "Check it is less than 72 hours since getting the test",
                                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.t.0.sc\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.t.0.sc\"},72,\"hour\"]}]}, true]}",
                                    "type": "DCC",
                                    "category": "test",
                                    "id": "5b38d298-e257-4960-92f5-6c3697af0bb9"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for approved test",
                                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"},{\"in\": [{\"var\": \"payload.t.0.tt\"},[\"LP6464-4\",\"LP217198-3\"]]}, true]}",
                                    "type": "DCC",
                                    "category": "test",
                                    "id": "28496945-624b-4485-b058-c68b6c912f5c"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for negative test result",
                                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"},{\"===\": [{\"var\": \"payload.t.0.tr\"},\"260415000\"]}, true]}",
                                    "type": "DCC",
                                    "category": "test",
                                    "id": "74bcaa71-cdfa-41a9-a2cf-a383d071b5b3"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for single test record",
                                    "predicate": "{\"if\": [{\"var\": \"payload.t.0\"},{\"!\": [{\"var\": \"payload.t.1\"}]}, true]}",
                                    "type": "DCC",
                                    "category": "test",
                                    "id": "d25301aa-ff49-4408-ac09-840315736156"
                                }
                            ]
                        },
                        {
                            "id": "41c5c4c2-50f9-475f-ab05-82764b9b52be",
                            "version": "2.0.1",
                            "name": "Verify a Recovery (signature w/ rules)",
                            "type": "DCC",
                            "category": "recovery",
                            "rules": [
                                {
                                    "version": "2.0.0",
                                    "name": "Check for single recovery record",
                                    "predicate": "{\"if\": [{\"var\": \"payload.r.0\"},{\"!\": [{\"var\": \"payload.r.1\"}]}, true]}",
                                    "type": "DCC",
                                    "category": "recovery",
                                    "id": "bf7ff58b-c0fb-40ae-9cd0-18847f9cc91f"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check current date is within the covered dates",
                                    "predicate": "{\"if\": [{\"var\": \"payload.r.0\"},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.r.0.df\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.r.0.du\"},0,\"day\"]}]}, true]}",
                                    "type": "DCC",
                                    "category": "recovery",
                                    "id": "33a70092-c30b-49ba-ab25-c53c7b12d918"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for COVID-19",
                                    "predicate": "{\"if\": [{\"var\": \"payload.r.0\"},{\"===\": [{\"var\": \"payload.r.0.tg\"},\"840539006\"]}, true]}",
                                    "type": "DCC",
                                    "category": "recovery",
                                    "id": "84cf3eb7-48f5-41f6-8ffe-197b5244cb19"
                                }
                            ]
                        }
                    ]
                },
                "VC": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.0"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": [
                        {
                            "id": "62847a9a-64f0-4544-a7e8-bbc0d7fc0157",
                            "version": "2.0.3",
                            "name": "Verify a credential (signature w/ expiration check)",
                            "type": "VC",
                            "category": "generic",
                            "rules": [
                                {
                                    "version": "2.0.2",
                                    "name": "Check the credential is not expired",
                                    "predicate": "{\"if\":[{\"var\":\"payload.expirationDate\"},{\"not-after\":[{\"plusTime\":[{\"var\":\"external.validationClock\"},0,\"day\"]},{\"plusTime\":[{\"var\":\"payload.expirationDate\"},0,\"day\"]}]}, true]}",
                                    "type": "VC",
                                    "category": "generic",
                                    "id": "b7b9b663-080e-41ac-96dd-1109d8c09f9d"
                                }
                            ]
                        }
                    ]
                },
                "GHP": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "issuer",
                                "credentialType": "type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "2.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "customerId": "IBM",
                            "type": "GHP",
                            "category": "generic",
                            "fields": [
                                {
                                    "field": "credentialSubject.recipient.givenName",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.familyName",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "credentialSubject.recipient.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "6c94d670-abec-49d1-961b-6ec35d3d1940"
                        }
                    ],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": [
                        {
                            "id": "6f415fca-bf08-41f6-9f05-e8b70daf0329",
                            "version": "2.0.1",
                            "name": "Perform required credential checks",
                            "type": "GHP",
                            "category": "generic",
                            "rules": [
                                {
                                    "version": "2.0.2",
                                    "name": "Ensure its a supported credential",
                                    "predicate": "{\"if\":[{\"or\":[{\"in\":[\"VaccinationCredential\",{\"var\":\"payload.type\"}]},{\"in\":[\"TestCredential\",{\"var\":\"payload.type\"}]}]}, true, \"unknown\"]}",
                                    "type": "GHP",
                                    "category": "generic",
                                    "id": "5c3779dc-ea6e-47df-aa15-41e203ec7abe"
                                },
                                {
                                    "version": "2.0.2",
                                    "name": "Check the credential is not expired",
                                    "predicate": "{\"if\":[{\"var\":\"payload.expirationDate\"},{\"not-after\":[{\"plusTime\":[{\"var\":\"external.validationClock\"},0,\"day\"]},{\"plusTime\":[{\"var\":\"payload.expirationDate\"},0,\"day\"]}]}, true]}",
                                    "type": "VC",
                                    "category": "generic",
                                    "id": "b7b9b663-080e-41ac-96dd-1109d8c09f9d"
                                }
                            ]
                        },
                        {
                            "id": "772baf2a-74b8-4ea6-ac6f-33050057322b",
                            "version": "2.0.2",
                            "name": "Verify a Vaccination (signature w/ rules)",
                            "type": "GHP",
                            "category": "vaccination",
                            "rules": [
                                {
                                    "version": "2.0.0",
                                    "name": "Check for approved vaccine",
                                    "predicate": "{\"if\":[{\"in\":[\"VaccinationCredential\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.medicinalProductCode\"},[\"207\",\"208\",\"210\",\"212\"]]},true]}",
                                    "type": "GHP",
                                    "category": "vaccination",
                                    "id": "1e3843d1-2599-43af-8277-1ca48e46999f"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for completed vaccination cycle",
                                    "predicate": "{\"if\":[{\"in\":[\"VaccinationCredential\",{\"var\":\"payload.type\"}]},{\">=\":[{\"var\":\"payload.credentialSubject.doseNumber\"},{\"var\":\"payload.credentialSubject.dosesPerCycle\"}]},true]}",
                                    "type": "GHP",
                                    "category": "vaccination",
                                    "id": "38a25914-4ad2-474c-a6ce-f69e89918c2b"
                                }
                            ]
                        },
                        {
                            "id": "b14bb493-eb86-4499-be5f-60e8b3a91ca6",
                            "version": "2.0.2",
                            "name": "Verify a Test (signature w/ rules including 72 hour check)",
                            "type": "GHP",
                            "category": "test",
                            "rules": [
                                {
                                    "version": "2.0.0",
                                    "name": "Check it is less than 72 hours since getting the test",
                                    "predicate": "{\"if\": [{\"in\": [\"TestCredential\",{\"var\": \"payload.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.credentialSubject.dateOfSample\"},72,\"hour\"]}]}, true]}",
                                    "type": "GHP",
                                    "category": "test",
                                    "id": "23a9cd6d-6b1b-4e3c-9a54-3c58a8140451"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for negative test result",
                                    "predicate": "{\"if\": [{\"in\": [\"TestCredential\",{\"var\": \"payload.type\"}]},{\"===\": [{\"var\": \"payload.credentialSubject.testResult\"},\"Not detected\"]}, true]}",
                                    "type": "GHP",
                                    "category": "test",
                                    "id": "4f9910c1-d1c8-4b88-9050-000ed569afd2"
                                },
                                {
                                    "version": "2.0.1",
                                    "name": "Check for approved test",
                                    "predicate": "{\"if\":[{\"in\":[\"TestCredential\",{\"var\":\"payload.type\"}]},{\"in\":[{\"var\":\"payload.credentialSubject.testType\"},[\"50548-7\",\"68993-5\",\"82159-5\",\"94306-8\",\"94307-6\",\"94308-4\",\"94309-2\",\"94500-6\",\"94502-2\",\"94503-0\",\"94504-8\",\"94507-1\",\"94508-9\",\"94531-1\",\"94533-7\",\"94534-5\",\"94547-7\",\"94558-4\",\"94559-2\",\"94562-6\"]]},true]}",
                                    "type": "GHP",
                                    "category": "test",
                                    "id": "ed4bb520-390e-4b3d-a34f-17699dd843ca"
                                }
                            ]
                        }
                    ]
                },
                "SHC": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "iss",
                                "credentialType": "vc.type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                        {
                            "version": "2.0.0",
                            "name": "Display only minimum identity (name, date of birth)",
                            "customerId": "IBM",
                            "type": "SHC",
                            "category": "generic",
                            "fields": [
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given",
                                    "displayValue": {
                                        "en": "First Name",
                                        "de": "Vorname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family",
                                    "displayValue": {
                                        "en": "Surname",
                                        "de": "Nachname"
                                    }
                                },
                                {
                                    "field": "vc.credentialSubject.fhirBundle.entry[0].resource.birthDate",
                                    "displayValue": {
                                        "en": "Date of Birth",
                                        "de": "Geburtsdatum"
                                    }
                                }
                            ],
                            "id": "4f853e85-bc5c-4ecb-8c26-562de6769182"
                        }
                    ],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": [
                        {
                            "id": "8bbcf09a-f548-42bd-81fc-784d6bfd3793",
                            "version": "2.0.1",
                            "name": "Perform required credential checks",
                            "type": "SHC",
                            "category": "generic",
                            "rules": [
                                {
                                    "version": "2.0.3",
                                    "name": "Ensure its a supported credential",
                                    "predicate": "{\"if\":[{\"in\":[\"VaccinationCredential\",{\"var\":\"payload.type\"}]},{\"or\":[{\"in\":[{\"var\":\"payload.credentialSubject.cvxCode\"},[\"207\",\"208\",\"210\",\"212\"]]},{\"in\":[{\"var\":\"payload.credentialSubject.medicinalProductCode\"},[\"207\",\"208\",\"210\",\"212\"]]}]},true]}",
                                    "type": "SHC",
                                    "category": "generic",
                                    "id": "fb26e0f4-6458-4aaa-9062-7223c95b55ce"
                                },
                                {
                                    "version": "2.0.2",
                                    "name": "Check the credential is not expired",
                                    "predicate": "{\"if\":[{\"var\":\"payload.expirationDate\"},{\"not-after\":[{\"plusTime\":[{\"var\":\"external.validationClock\"},0,\"day\"]},{\"plusTime\":[{\"var\":\"payload.expirationDate\"},0,\"day\"]}]}, true]}",
                                    "type": "VC",
                                    "category": "generic",
                                    "id": "b7b9b663-080e-41ac-96dd-1109d8c09f9d"
                                }
                            ]
                        },
                        {
                            "id": "6c336429-a6d9-4a37-8404-ce796f0a0d5b",
                            "version": "2.0.1",
                            "name": "Verify a Vaccination (signature w/ rules)",
                            "type": "SHC",
                            "category": "vaccination",
                            "rules": [
                                {
                                    "version": "2.0.2",
                                    "name": "Check for completed vaccination cycle, of approved vaccine, between 14 and 365 days ago (single dose)",
                                    "predicate": "{\"if\":[{\"and\":[{\"in\":[\"https://smarthealth.cards#immunization\",{\"var\":\"payload.vc.type\"}]},{\"in\":[{\"var\":\"payload.vc.credentialSubject.fhirBundle.entry.1.resource.vaccineCode.coding.0.code\"},[\"212\"]]}]},{\"not-after\":[{\"plusTime\":[{\"var\":\"payload.vc.credentialSubject.fhirBundle.entry.1.resource.occurrenceDateTime\"},14,\"day\"]},{\"plusTime\":[{\"var\":\"external.validationClock\"},0,\"day\"]},{\"plusTime\":[{\"var\":\"payload.vc.credentialSubject.fhirBundle.entry.1.resource.occurrenceDateTime\"},365,\"day\"]}]},true]}",
                                    "type": "SHC",
                                    "category": "vaccination",
                                    "id": "a6e3b187-0350-4423-9d0d-7ef9e5eccc20"
                                }
                            ]
                        },
                        {
                            "id": "ec7fa29d-1a1d-48bc-9c79-9bbf44b3eb50",
                            "version": "2.0.2",
                            "name": "Verify a Test (signature w/ rules including 72 hour check)",
                            "type": "SHC",
                            "category": "test",
                            "rules": [
                                {
                                    "version": "2.0.0",
                                    "name": "Check it is less than 72 hours since getting the test",
                                    "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#laboratory\",{\"var\": \"payload.vc.type\"}]},{\"not-after\": [{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"external.validationClock\"},0,\"day\"]},{\"plusTime\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.effectiveDateTime\"},72,\"hour\"]}]}]}",
                                    "type": "SHC",
                                    "category": "test",
                                    "id": "4a2a9e4b-aed2-4b17-9b24-49c8deb70174"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for negative test result",
                                    "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#laboratory\",{\"var\": \"payload.vc.type\"}]},{\"===\": [{\"var\": \"payload.vc.credentialSubject.fhirBundle.entry.1.resource.valueCodeableConcept.coding.0.code\"},\"260415000\"]}]}",
                                    "type": "SHC",
                                    "category": "test",
                                    "id": "f07544d8-10be-4098-893d-0dc1882a9090"
                                },
                                {
                                    "version": "2.0.0",
                                    "name": "Check for approved test",
                                    "predicate": "{\"if\": [{\"in\": [\"https://smarthealth.cards#laboratory\",{\"var\": \"payload.vc.type\"}]},{\"in\":[{\"var\":\"payload.vc.credentialSubject.fhirBundle.entry.1.resource.code.coding.code\"},[\"50548-7\",\"68993-5\",\"82159-5\",\"94306-8\",\"94307-6\",\"94308-4\",\"94309-2\",\"94500-6\",\"94502-2\",\"94503-0\",\"94504-8\",\"94507-1\",\"94508-9\",\"94531-1\",\"94533-7\",\"94534-5\",\"94547-7\",\"94558-4\",\"94559-2\",\"94562-6\"]]},true]}",
                                    "type": "SHC",
                                    "category": "test",
                                    "id": "54735288-8850-4210-bb3b-205c9188570f"
                                }
                            ]
                        }
                    ]
                },
                "OA": {
                    "metrics": [
                        {
                            "name": "Counts verifications by result, issuer, type",
                            "extract": {
                                "issuerDID": "iss",
                                "credentialType": "vc.type.2"
                            },
                            "countBy": {
                                "scan": true,
                                "scanResult": true,
                                "extract": true
                            }
                        }
                    ],
                    "display": [
                    ],
                    "trust-lists": [
                        {
                            "version": "1.0.0",
                            "name": "Trust all issuers known to Digital Health Pass",
                            "items": [
                                {
                                    "purpose": "",
                                    "publisher": "IBM",
                                    "schemas": [],
                                    "issuers": []
                                }
                            ],
                            "type": "GHP",
                            "id": "de45f872-3741-4dca-8ab6-795fa31cddab"
                        }
                    ],
                    "rule-sets": []
                }
            }
        }
    ]
};


module.exports = {
    getValidIbmPublicKeyPayload,
    getValidGhpPublicKeyPayload,
    getValidVciPublicKeyPayload,
    getValidEuIssuerManagerKeyPayload,
    getVerifierConfigPayload,
    getVerifierConfigPayloadPartial,
    getVerifierConfigPayloadDeprecated,    
};
