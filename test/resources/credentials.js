/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable max-len */

const credentials = {
    "version": "https://schema.openattestation.com/2.0/schema.json",
    "data": {
        "id": "a3715553-92d7-4419-8a9f-b64e13a995a3:string:63aed072-2b73-4bae-a311-51e01c6e402d",
        "name": "8bac39f4-a25c-4c06-848f-5f3dcd65a3a2:string:VaccinationHealthCert",
        "validFrom": "207dd6df-3538-4338-86ef-9ef55b4bfa5e:string:2021-10-30T08:00:08.155Z",
        "fhirVersion": "8e7398c7-d3b5-4f11-9425-5e31d91c989c:string:4.0.1",
        "fhirBundle": {
            "resourceType": "e86bc64a-f29d-45c5-8d98-8e8965ce950a:string:Bundle",
            "type": "6b06ca63-c368-4a2a-9d94-4a64b9a25e45:string:collection",
            "entry": [{
                "fullUrl": "116e9d99-97af-4bc5-b81d-817e1af52711:string:urn:uuid:cfa8cfd4-1072-4f62-b45b-6dcab782b131",
                "resourceType": "167bf812-afee-43af-a00e-08b4e5bade5d:string:Patient",
                "extension": [{
                    "url": "02f4e2d7-ae23-48ec-9a1c-9caa2be47f3f:string:http://hl7.org/fhir/StructureDefinition/patient-nationality",
                    "code": {"text": "faaa5ae1-6885-45a9-b344-5abf5aad19e3:string:MY"}
                }],
                "identifier": [{
                    "type": "c824321c-76b9-4b24-9e42-e94693306bc6:string:PPN",
                    "value": "e49ac489-5a6c-4b32-87b7-6f7bef2e5246:string:A51055802"
                }, {
                    "type": {"text": "46e7fdd5-15e3-47bb-afa0-ed34c064c66c:string:NRIC"},
                    "value": "34b25fa2-976d-4d00-ab2a-7b3ffef0e555:string:S****845J"
                }],
                "name": [{"text": "44649964-4747-4b61-aded-879d526e8c0d:string:ONG KHAI WEI"}],
                "gender": "60228cea-b1e2-4228-af63-0a89f1daf0c5:string:male",
                "birthDate": "9958cc6d-327c-4331-b907-7be3da0a9e50:string:1984-07-16"
            }, {
                "fullUrl": "27ba5c75-bd25-4a76-87c1-83e3f801b8cd:string:urn:uuid:95ecced2-3f16-4566-9c51-b17f61112e65",
                "resourceType": "897ff204-d6c7-45ba-89e6-7f46e873a44b:string:Location",
                "id": "e2d4602a-732f-46d8-a311-6bf901d9c009:string:21M0092",
                "name": "6face840-2382-41ff-9e03-c96896922007:string:Vaccination site approved by Ministry of Health (MOH), Singapore [21M0092]",
                "address": {"country": "9ce771b3-c134-4ded-916e-d6b9aef49c3d:string:SG"}
            }, {
                "fullUrl": "0a0ef6d2-8f36-4ec2-9940-366ab8f914c9:string:urn:uuid:4dab94f3-11af-4b90-baa9-70914131247c",
                "resourceType": "0a586c94-3d76-4ea2-b310-3da6372d3e81:string:Location",
                "id": "fd83ccdd-a830-4848-9bad-de7dec658456:string:21M0092",
                "name": "dbfd5695-7589-4232-9853-c76c934ce3b6:string:Vaccination site approved by Ministry of Health (MOH), Singapore [21M0092]",
                "address": {"country": "7b4e33bd-3bb7-4a05-88b0-2b5126bce9d9:string:SG"}
            }, {
                "fullUrl": "5dac69a0-cd08-4ebb-b86c-a923c7bf3855:string:urn:uuid:4809e916-4355-48d6-b6cf-ee318aa00045",
                "resourceType": "7130604d-acb6-4690-822f-fd87ade35e38:string:Immunization",
                "vaccineCode": {
                    "coding": [{
                        "system": "8e7c5691-441b-428b-8feb-3ed33876ba15:string:http://standards.ihis.com.sg",
                        "code": "9a53e78e-296b-4214-a7ca-e0ee036f6fd5:string:3339641000133109",
                        "display": "df9aeca9-4b6f-45a3-ab14-3a3a01c7baf1:string:PFIZER-BIONTECH/COMIRNATY COVID-19 Vaccine [Tozinameran] Injection"
                    }]
                },
                "lotNumber": "1068d0aa-3565-4c7f-950b-c1f93af6e056:string:1E022A",
                "occurrenceDateTime": "b2726b81-ab8f-413b-9af6-1249f4a30f75:string:2021-07-07",
                "patient": {"reference": "84325310-f354-4ca4-8a1d-cfd765f53d47:string:urn:uuid:cfa8cfd4-1072-4f62-b45b-6dcab782b131"},
                "location": {"reference": "bcac4a10-cf98-4e67-b1d5-4c493edbcd6c:string:urn:uuid:95ecced2-3f16-4566-9c51-b17f61112e65"},
                "performer": [{"actor": {"display": "b08664ee-2b9f-453c-8060-a387742d895d:string:Designated vaccinator by MOH-approved vaccination site"}}]
            }, {
                "fullUrl": "f966f2ab-2853-45f7-a525-ad31d7266680:string:urn:uuid:bf72bdf0-746c-4e72-84f3-92e3e7f7558a",
                "resourceType": "c45e1e09-a69b-4d5c-82b5-e12528b0b8f8:string:Immunization",
                "vaccineCode": {
                    "coding": [{
                        "system": "0d1f4b11-4756-4f43-a19d-5ae3def1dbba:string:http://standards.ihis.com.sg",
                        "code": "11dae5e0-e712-494c-bda1-3abd24a76ad9:string:3339641000133109",
                        "display": "bf52f0c3-0602-4426-8207-dd2404e7b481:string:PFIZER-BIONTECH/COMIRNATY COVID-19 Vaccine [Tozinameran] Injection"
                    }]
                },
                "lotNumber": "92643a9d-8993-4f3a-a5d6-e1a5e24d839c:string:FF2154",
                "occurrenceDateTime": "b29d3b9f-13e9-4c40-8351-446639d22646:string:2021-08-09",
                "patient": {"reference": "3ec718a2-8dae-448c-bacd-7a0a45d12c3b:string:urn:uuid:cfa8cfd4-1072-4f62-b45b-6dcab782b131"},
                "location": {"reference": "72db8ee8-ed8a-43c0-b5de-dc2ea48ee947:string:urn:uuid:4dab94f3-11af-4b90-baa9-70914131247c"},
                "performer": [{"actor": {"display": "f86a94f7-1b11-4973-a5a6-24b51317e063:string:Designated vaccinator by MOH-approved vaccination site"}}]
            }, {
                "fullUrl": "c4cf36ea-341a-4290-8d32-229766e09acf:string:urn:uuid:cb13a343-07e5-4164-9294-1bb8340d8d2f",
                "resourceType": "e8170680-354c-4784-b508-e0c8977c959f:string:ImmunizationRecommendation",
                "recommendation": [{
                    "targetDisease": {
                        "coding": [{
                            "system": "6b3c04a6-add9-4dba-a15e-6cc646cf5bbd:string:http://snomed.info/sct",
                            "code": "e9a09292-5870-43a7-b988-c91b0457c981:string:840539006",
                            "display": "ed7f7ca8-d822-4f3e-a922-2c67e61c14e4:string:COVID-19"
                        }]
                    },
                    "forecastStatus": {
                        "coding": [{
                            "system": "371d15d1-d4d9-4818-8421-8848a53a5863:string:http://snomed.info/sct",
                            "code": "6ad7b30d-3b3a-479c-8667-b6532e568558:string:complete",
                            "display": "c3287080-ad12-423b-97af-7fd5b006eb4e:string:Complete"
                        }]
                    },
                    "dateCriterion": [{
                        "code": {
                            "coding": [{
                                "system": "06aa0846-d98e-46d6-b437-67049a03f7d4:string:",
                                "code": "7111e695-b76d-45c0-80e7-ac810498d060:string:effective",
                                "display": "7f4973ee-fbc6-4ac2-b7b3-ecc68c73a150:string:Effective"
                            }]
                        }, "value": "4a3622b1-a1ba-40ca-bdec-2173a3899c66:string:2021-08-23"
                    }]
                }],
                "patient": {"reference": "0a0b9f38-ec95-43ee-bb8a-61588bfde8b2:string:urn:uuid:cfa8cfd4-1072-4f62-b45b-6dcab782b131"}
            }]
        },
        "issuers": [{
            "name": "cad56419-700d-477e-999a-436b010a7954:string:MINISTRY OF HEALTH (SINGAPORE)",
            "id": "c9f409a4-43e8-4ec0-978e-b79b6b335ee5:string:did:ethr:0xa05e47618bf84101b032b300ab18fc11b90bd549",
            "revocation": {
                "type": "9fc9c330-ad20-47a2-ac0b-abfb16968327:string:REVOCATION_STORE",
                "location": "21f607a1-f3ae-46fd-b18d-9fa9d1f75a37:string:0x7384702915962d70Ef202Ffb38152c4c89cD98dA"
            },
            "identityProof": {
                "type": "edcd4dcf-cfd1-4ac2-9177-019df0e68190:string:DNS-DID",
                "location": "a0d97151-5ac8-45ea-9ece-f9443c25b477:string:moh.gov.sg",
                "key": "20efbcf5-4994-41ab-958e-108836fa4d0d:string:did:ethr:0xa05e47618bf84101b032b300ab18fc11b90bd549#controller"
            }
        }],
        "$template": {
            "name": "09f8e158-cb49-481b-b642-a8b9a6488d64:string:VACCINATION_CERT",
            "type": "ad8b69bf-a986-4356-8292-539a03b6d97f:string:EMBEDDED_RENDERER",
            "url": "164fde91-5e6f-4ab5-8ae5-858f9256b05f:string:https://healthcert.renderer.moh.gov.sg/"
        },
        "notarisationMetadata": {
            "reference": "21819c0c-3c50-469e-a7cc-481f6eb19b95:string:63aed072-2b73-4bae-a311-51e01c6e402d",
            "notarisedOn": "e60255fd-f2ea-4b24-84ae-03ebbd3afc71:string:2021-10-30T08:00:08.155Z",
            "passportNumber": "bfb0b17f-b37c-4804-8e22-3809f6e1a22e:string:A51055802",
            "url": "e145c2c7-e090-4156-a186-b5cdbef0825a:string:https://www.verify.gov.sg/verify?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fapi-vaccine.storage.aws.notarise.gov.sg%2Fdocument%2F79d6cd69-2911-4746-a9e6-282ea0918b80%22%2C%22permittedActions%22%3A%5B%22VIEW%22%2C%22STORE%22%5D%7D%7D#%7B%22key%22%3A%22b156f803d097c2bd42de6397a8e5a19f4eb90518307074caaf38da19ff9eae0f%22%7D",
            "signedEuHealthCerts": "edf202a3-3a3b-4756-82b8-eff3f94cd8b6:undefined:undefined"
        },
        "logo": "bca46e52-bb88-4e68-804a-a3e22d4eff3a:string:data:image/png;base64,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\n"
    },
    "signature": {
        "type": "SHA3MerkleProof",
        "targetHash": "1d616c6c0b229f4fd9ae762972601e622cadb048624a98915c72f80287149d69",
        "proof": [],
        "merkleRoot": "1d616c6c0b229f4fd9ae762972601e622cadb048624a98915c72f80287149d69"
    },
    "proof": [{
        "type": "OpenAttestationSignature2018",
        "created": "2021-10-30T08:00:08.363Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:ethr:0xa05e47618bf84101b032b300ab18fc11b90bd549#controller",
        "signature": "0x0632cad4b348f180660089af8db16d428d6f65598b825af6f60417bf59097d9f318f230b17a5df71f7c6e3f974f7cb5af8f7624aadd04a2c8818d2ca5c53b2781c"
    }]
}

const invalidCredentials = {
    "version": "https://schema.openattestation.com/2.0/schema.json",
    "data": {
        "id": "2a3b9013-e356-42ca-bf2d-d9b61e64e0df:string:SERIAL_NUMBER_1234",
        "$template": {
            "name": "0f090abf-38ab-4241-a51c-08e1d7728754:string:CUSTOM_TEMPLATE",
            "type": "a4c64a2a-a1c6-4dcc-89fe-7629699be65b:string:EMBEDDED_RENDERER",
            "url": "3b3b9044-0bf9-456c-ab62-5dd8ff1fd57d:string:https://localhost:3000/renderer"
        },
        "issuers": [
            {
                "name": "edfc092e-94a0-42de-8bcc-ba3c9c34da35:string:DEMO STORE",
                "tokenRegistry": "5b698857-5330-473a-b5d2-8069972a5e4e:string:0x9178F546D3FF57D7A6352bD61B80cCCD46199C2d",
                "identityProof": {
                    "type": "d2e96e3b-e0fb-44c9-9d9e-99b9c5fa3542:string:DNS-TXT",
                    "location": "d360e1bc-6fdf-457b-83fe-f83b5b30c0ac:string:tradetrust.io"
                }
            }
        ],
        "recipient": {
            "name": "9283da9b-0224-4adb-a087-0d04e3c5af12:string:Recient Name"
        },
        "unknownKey": "8077f226-7a4d-4050-80ac-99fe6ed42dab:string:unknownValue",
        "attachments": [
            {
                "filename": "a2def395-e212-4078-a958-d11ce8846d34:string:samplดเกเse.pdf",
                "type": "e8a68b5e-a8c6-4a93-b187-0f6300200614:string:application/pdf",
                "data": "d47ab725-4990-4c49-85b7-40ad4d7655a1:string:BASE64_ENCODED_FILE"
            }
        ]
    },
    "signature": {
        "type": "SHA3MerkleProof",
        "targetHash": "5c842f09ea76f0c6c35347083a274d8ab1a7d130790be4d3db2765f4d62569f2",
        "proof": [],
        "merkleRoot": "5c842f09ea76f0c6c35347083a274d8ab1a7d130790be4d3db2765f4d62569f2"
    },
    "proof": [
        {
            "type": "OpenAttestationSignature2018",
            "created": "2021-11-05T09:49:20.115Z",
            "proofPurpose": "assertionMethod",
            "verificationMethod": "did:ethr:0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C#controller",
            "signature": "0xf5007c56565cb748b46ecaab9ad0e6f286c4f629021ca8eb2b2411d5ebc9312860aef8770e2164624482ca782051fb0e09ba231977b4178b90c96d04df68e33a1c"
        }
    ]
}


module.exports = {credentials, invalidCredentials}