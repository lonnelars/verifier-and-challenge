const { make } = require("../index.js");
const vc = make().then(values => {
  const pVerifier = document.createElement("p");
  pVerifier.textContent = `verifier: ${values.verifier}`;
  document.body.appendChild(pVerifier);
  const pChallenge = document.createElement("p");
  pChallenge.textContent = `challenge: ${values.challenge}`;
  document.body.appendChild(pChallenge);
});
