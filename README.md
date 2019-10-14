# verifier-and-challenge
An npm package for generating verifier and challenge values as described in RFC 7636.

This package exports a single function called `generateVerifierAndChallenge`, which generates a Promise which resolves with an object with two keys. One is called `verifier`, and is a 43-character random string, consisting of URL-safe characters. The other is called `challenge`, and is the SHA-256 hash of the verifier. 

These values can be used as a "Proof key for code exchange for OAuth public clients", as described in https://tools.ietf.org/html/rfc7636. 

## Compatibility

The code should work in IE 11 and modern browsers, assuming that `window.Promise` is defined. For IE 11, that means you will have to use a polyfill. https://github.com/stefanpenner/es6-promise is one alternative. 
