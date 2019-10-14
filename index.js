require("./TextEncoder.js");

function base64URLEncode(buffer) {
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  return arrayBufferToBase64(buffer)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function generateVerifierAndChallenge() {
  const verifier = makeVerifier();
  return makeChallenge(verifier).then(challenge => ({
    verifier,
    challenge
  }));
}

function makeVerifier() {
  const buffer = new Uint8Array(32);
  const crypto = window.crypto || window.msCrypto;
  crypto.getRandomValues(buffer);
  return base64URLEncode(buffer);
}

function makeChallenge(verifier) {
  let buffer = new TextEncoder().encode(verifier);
  if (window.crypto) {
    return window.crypto.subtle.digest("SHA-256", buffer).then(base64URLEncode);
  } else if (window.msCrypto) {
    return new Promise((resolve, reject) => {
      const cryptoOperation = window.msCrypto.subtle.digest("SHA-256", buffer);
      cryptoOperation.oncomplete = function(event) {
        resolve(base64URLEncode(cryptoOperation.result));
      };
      cryptoOperation.onerror = function(event) {
        reject("Could not complete the SHA-256 hash.");
      };
    });
  } else {
    throw "Could not find window.crypto or window.msCrypto. This browser is not supported.";
  }
}

module.exports = { generateVerifierAndChallenge };
