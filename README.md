## Readme

**Merative<sup>®</sup> Digital Health Pass**

# Multi-Credential Verifier Library

**Version 2.1, November 2022**   © Copyright Merative US L.P. and others 2020-2022

[↳ Introduction](#introduction)

[↳ Available verifier plug-ins](#available-verifier-plug-ins)

[↳ Using the library](#using-the-library)

[↳ Using credentialVerifierBuilder](#using-credentialverifierbuilder)

[↳ Verifier credential and cache expiration](#verifier-credential-and-cache-expiration)

[↳ Verification messages](#verification-messages)

[↳ Creating a custom credential verifier plug-in](#creating-a-custom-credential-verifier-plugin)

[↳ Library licenses](#library-licenses)

## Introduction

Merative<sup>®</sup> provides this extensible library for use by [Digital Health Pass](https://www.ibm.com/products/digital-health-pass/ "Digital Health Pass") customers that want to verify several types of digitally-verifiable healthcare credentials. The credential verifiers are referred to as **plug-ins**. If this library does not contain a verifier plug-in for a given type of credential, then you can create a custom plug-in and pass it to the library.

[↑ Top](#readme)

### Available verifier plug-ins

In this SDK, several plug-ins are provided that can verify encrypted, digital credentials.

**Table 1: Currently-available verifier plug-ins**

| Healthcare credentials                                            | Plug-in name    |
| ----------------------------------------------------------------- | --------------- |
| **Digital Health Pass (IDHP)** and **Good Health Pass (GHP)** | idhp-verifier   |
| **Digital COVID Certificate (European Union)**                    | eu-dcc-verifier |
| **Vaccine Credential Initiative (VCI™) SMART Health Cards**       | vci-verifier    |

[↑ Top](#readme)

## Using the library

To verify credentials, you must first include the library in your project. Then, you'll normally only need to import one class, `CredentialVerifierBuilder`.

    `const { CredentialVerifierBuilder } = require('healthpass-verify-lib');`

To instantiate verifying credentials:

```
    // Instantiate the builder
    const builder = new CredentialVerifierBuilder()
        .setHealthpassHostUrl(hpassHost)
        .setVerifierCredential(verifierCredential)
        .setReturnCredential(true)
        .setReturnMetadata(true);

    // Initialize the builder instance
    const initResponse = await builder.init();

    // If initialize fails, inspect response, and try again
    if (!initResponse.success) {
        return initResponse;
    }

    // Start verifying credentials

    // Set the credential and build a verifier
    const verifier = builder
        .setCredential(credential)
        .build();

    // Verify the credential
    const verifyResult = await verifier.verify();

    // Verification was not successful.  Check verifyResult.message and/or verifyResult.error
    if (!verifyResult.success) {
        return verifyResult;
    }

```

`builder.build()` returns an instance of `CredentialVerifier`, which has only one public method, `verify()`.

`verifier.verify()` returns a `VerificationResult` instance, which has this structure:

```
    {
        "success": "true or false boolean",
        "message": "status message",
        "credType": "IDHP, GHP, SHC, DCC, UNKNOWN",
        "credential": "the extracted credential",
        "metadata": "the metadata extracted from the credential with custom keys"
        "error": "axios error that occurred while communicating with healthpass api"
        "warnings": "pending cache and/or verifier credential expiration warnings" 
        "credential": "the decoded credential"
    }
```

[↑ Top](#readme)

### Using `CredentialVerifierBuilder`

#### `setHealthpassHostUrl(healthpassHost)` (required)

This sets the Healthpass Host URL that is used to obtain tokens, verifier configurations, and public keys:

```
    new CredentialVerifierBuilder().setHealthpassHostUrl(healthpassHost);
```

#### `setVerifierCredential(verifierCredential)` (required)

This sets the verifier credential used to log in and download the verifier configuration:

```
    const initResponse = await builder.init();
```

#### `init()` (required)

This must be called after instantiating a `CredentialVerifierBuilder`, and before verifiy credentials to initialize the builder.

Initialization logs in with the verifier credential, downloads the verifier configuration, pre-cache public keys (if configured to do so), and configures the builder to create verifiers. In addition, after setting a new verifier credential,  `init()` must be called, using `setVerifierCredential()`.

#### `setCredential(credential)` (required)

This sets the credential to be verified. The `credential` parameter can either be an object or a string. A credential must always be provided:

```
    new CredentialVerifierBuilder().setCredential(credential);
```

#### `setMetadataLanguage(lang)` (optional)

This sets the two-letter country code for the language to use for keys for the credential metadata returned in the VerificationResult.  The default is `en`, for English:

```
    new CredentialVerifierBuilder().setMetadataLanguage(lang);
```

#### `setAdditionalPlugins(additionalPlugins)` (optional)

This sets custom credential verifier plug-ins that are not provided by the library. The `additionalPlugins` parameter can be either a single `VerifierPlugin` or an array of `VerifierPlugin`. For more information about creating custom verifier plug-ins, see [Creating a custom credential verifier plug-in](#creating-a-custom-credential-verifier-plugin).

```
    new CredentialVerifierBuilder().setAdditionalPlugins(additionalPlugins);
```

#### `setDisabledPlugins(disabledPlugins)` (optional)

This sets the names of disabled credential verifier plug-ins. These plug-ins do not execute during credential verification:

```
    new CredentialVerifierBuilder()
        .setDisabledPlugins([
            'eu-dgc-verifier',
            'vci-verifier'
        ]);
```

#### `setReturnCredential(returnCredential)` (optional)

This sets whether a successful validation returns the credential in the payload (`VerificationResult`). The default is false:

```
    new CredentialVerifierBuilder().setReturnCredential(true);
```

#### `setReturnMetadata(returnMetadata)` (optional)

This sets whether a successful validation returns the credential metadata in the payload (`VerificationResult`). The default is false:

```
    new CredentialVerifierBuilder().setReturnMetadata(true);
```

#### `setExtras(extras)` (optional)

This can be anything that is needed by a custom credential verifier plug-in. For more information, see [Creating a custom credential verifier plug-in](#creating-a-custom-credential-verifier-plugin).

```
    new CredentialVerifierBuilder()
        .setExtras({somthing: 'needed for custom plugin'});
```

#### `getVerifierConfiguration()` (optional)

This returns the cached verifier configuration which can be helpful for troubleshooting.

```
    const builder = new CredentialVerifierBuilder();
    await builder.getVerifierConfiguration();
```

[↑ Top](#readme)

## Verifier credential and cache expiration

A verifier credential has an expiration date within the JSON. The cache has a ttl (time to live) in seconds, which is specified in the verifier configuration.  Both have a grace period of 90 percent of the expiration date or ttl, when the `VerificationResult` payload contains warnings of the pending expiration.  

Example: If the cache expires in 24 hours, then the grace period starts in 21.6 hours, and the payload returns with a warning.

When the grace period begins, the cache automatically begins refreshing itself, if there is network connectivity.  A new verifier credential can be set on the builder instance by calling `setVerifierCredential`, and then calling `init`.

If either the verifier credential or the cache expiration is reached, then verification is not be possible until the issue is resolved.  Here are the warning and errors that are returned:

`The cache will expire on <*DATE*>.  Connect to network to refresh cache before then to continue verifying credentials.`

`Verifier credential will expired on <*DATE*>.  Set a new verifier credential while connected to network before then to continue verifying credentials.`

`Verifier credential expired on <*DATE*>.  Set a new verifier credential while connected to network to continue verifying credentials.`

`Cache expired on <*DATE*>.  Connect to network to refresh cache to continue verifying credentials.`

[↑ Top](#readme)

## Verification messages

This section lists messages returned in the `VerificationResult` payload.

**Table 2: VerificatonResult messages**

| Message text                                               | Message value                                                                                         |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `Credential is valid`                                      | The credential passes signature and rules validation.                                                 |
| `Certificate's signature is not valid`                     | The credential's signature is not valid.                                                              |
| `Credential is not valid. Failing rule id(s):<*Rule_IDs*>` | The credential failed at least one rule. This includes a comma-delimited list of the failed rule IDs. |
| `Unknown Credential Type`                                  | Verifying an unknown credential type                                                                  |
| `Unknown Issuer`                                           | The issuer is not found in the Healthpass API.                                                        |
| `Revoke status validation failed :: Credential is revoked` | The credential is revoked.                                                                            |
| `Unknown public key format`                                | The public key that is used to verify a credential is in an unknown format.                           |
| `Trust lists not found`                                    | The trust list for a credential type is not found in the verifier configuration.                      |
| `Rules not found`                                          | The rules for a credential type are not found in the verifier configuration.                          |
| `Display mapping not found for <*credType*>`               | The display mapping for a credential type is not found in the verifier configuration.                 |

#### Network errors

The axios library is used for communication to the Healthpass API. If there is an error communicating, the error object is returned in the `VerificationResult` error field, for debugging purposes.

[↑ Top](#readme)

## Creating a custom credential verifier plug-in

You can create custom credential verifier plug-ins to verify credentials that are not supported by the library's provided plug-ins. 

This creates a plug-in and imports the `VerifierPlugin` and `VerificationResult` classes:

```
    const { VerifierPlugin, VerificationResult } = require('healthpass-verify-lib');
```

The plug-in must extend the abstract `VerifierPlugin` class. There are two methods that must be implemented: `verify(params)` and `getName()`. 

A string for the name of the plug-in should be returned from `getName()`. The credential verification logic is in `verify(params)`. During verification, an instance of `CredentialVerifierParams` is passed as the single parameter. The parameter contains all properties that are set on the builder instance. This method should return a `VerificationResult` instance, indicating whether the verification was successful. 

To check whether the passed credential is of the type intended to be verified by the plug-in, a check should be placed at the beginning of the verification logic. If not the intended type, then a `VerificationResult` instance should be returned; this instance contains both a false first parameter and a null second parameter.

```
    class ExampleCredentialVerifier extends VerifierPlugin {
        async verify(params) {
            const credential = params.getCredential();
            const publicKey = params.getExtras().publicKey;

            if (!this.checkIsExampleCredentialType(credential)) {
                return new VerificationResult(false, null);
            }

            if(!this.verifySignature(credential, publicKey)) {
                return new VerificationResult(
                    false, 'Signature verification failed for example credential type'
                );
            }

            return new VerificationResult(
                true, 'Signature verification passed for example credential type', credential
            );
        }

        getName() {
            return 'example-credential-verifier';
        }

        checkIsExampleCredentialType(credential) {
            return credential.type === 'ExampleCredentialType';
        }

        verifySignature(credential, publicKey) {
            // return true if able to verifiy the credential's
            // signature with the public key, else return false.
            return true;
        }
    }
```

To use the custom plug-in, simply pass the class to the builder using the `setAdditionalPlugins()` method:

```
    const { success, message } = await new CredentialVerifierBuilder()
        .setAdditionalPlugins(ExampleCredentialVerifier)
        .setCredential(credential)
        .build()
        .verify();
```

[↑ Top](#readme)

## Library licenses

This section lists open source libraries used in this SDK. 

**Table 3: Libraries and sources for this SDK** 

| Library              | Source                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- |
| `asn1.js`            | MIT License (<https://github.com/indutny/asn1.js>)                                 |
| `async-lock`         | MIT License (<https://www.npmjs.com/package/async-lock>)                           |
| `axios`              | MIT License (<https://www.npmjs.com/package/axios>)                                |
| `base45-js`          | MIT License (<https://www.npmjs.com/package/base45>)                               |
| `base64url`          | MIT License (<https://www.npmjs.com/package/base45>)                               |
| `bn.js`              | MIT License (<https://github.com/indutny/bn.js>)                                   |
| `cbor`               | MIT License (https://www.npmjs.com/package/cbor)                                   |
| `cose-js`            | Apache License 2.0 (<https://www.npmjs.com/package/cose-js>)                       |
| `crypto-js`          | MIT License (<https://www.npmjs.com/package/crypto-js>)                            |
| `ecdsa-secp256r1`    | MIT License (https://www.npmjs.com/package/ecdsa-secp256r1)                        |
| `jsdoc`              | Apache License 2.0 (<https://www.npmjs.com/package/jsdoc>)                         |
| `json-logic-js`      | MIT License (<https://www.npmjs.com/package/json-logic-js>)                        |
| `json-normalize`     | Internet Systems Consortium (ISC) (<https://www.npmjs.com/package/json-normalize>) |
| `jsonpath`           | MIT License (<https://www.npmjs.com/package/jsonpath>)                             |
| `jsonwebtoken`       | MIT License (<https://www.npmjs.com/package/jsonwebtoken>)                         |
| `lodash`             | MIT License (<https://github.com/lodash/lodash>)                                   |
| `moment`             | MIT License (<https://www.npmjs.com/package/moment>)                               |
| `node-cache`         | MIT License (<https://www.npmjs.com/package/node-cache>)                           |
| `node-jose`          | Apache License 2.0 (<https://www.npmjs.com/package/node-jose>)                     |
| `pako`               | MIT License and zlib (<https://www.npmjs.com/package/pako>)                        |
| `retry-axios`        | Apache License 2.0 (<https://www.npmjs.com/package/retry-axios>)                   |
| `safe-flat`          | MIT License (<https://www.npmjs.com/package/safe-flat>)                            |
| `source-map-support` | MIT License (<https://github.com/evanw/node-source-map-support>)                   |
| `node-cron`          | ISC License (<https://www.npmjs.com/package/node-cron>)                            |
| [↑ Top](#readme)     |                                                                                    |
