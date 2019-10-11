function base64URLEncode(buffer) {
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  return arrayBufferToBase64(buffer)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function makeVerifierAndChallenge() {
  var verifier = makeVerifier();
  return makeChallenge(verifier).then(challenge => ({
    verifier,
    challenge
  }));
}

function makeVerifier() {
  var buffer = new Uint8Array(32);
  window.crypto.getRandomValues(buffer);
  return base64URLEncode(buffer);
}

function makeChallenge(verifier) {
  var buffer = new TextEncoder().encode(verifier);
  return window.crypto.subtle.digest("SHA-256", buffer).then(base64URLEncode);
}

exports.makeVerifierAndChallenge = makeVerifierAndChallenge;
