const { generateVerifierAndChallenge } = require("../index.js");
const vc = generateVerifierAndChallenge().then(values => {
  const pVerifier = document.createElement("p");
  pVerifier.textContent = `verifier: ${values.verifier}`;
  document.body.appendChild(pVerifier);
  const pChallenge = document.createElement("p");
  pChallenge.textContent = `challenge: ${values.challenge}`;
  document.body.appendChild(pChallenge);
});
