describe("makeVerifierAndChallenge spec", () => {
  beforeEach(async () => {
    // this forces a secure context
    await page.goto("file:///dev/null");
    await page.addScriptTag({ path: "./dist/index.js" });
  });

  test('when loading the file in the browser, the "make" function is defined', async () => {
    await expect(
      page.evaluate(() => verifierAndChallenge.make)
    ).resolves.toBeTruthy();
  });

  describe('when calling the function "make"', () => {
    test('then the promise resolves to an object with keys "verifier" and "challenge"', async () => {
      const object = await page.evaluate(() => verifierAndChallenge.make());
      expect(object.verifier).toBeTruthy();
      expect(object.challenge).toBeTruthy();
    });

    test("then the verifier is a string of length 43", async () => {
      const { verifier, challenge } = await page.evaluate(() =>
        verifierAndChallenge.make()
      );
      expect(verifier.length).toEqual(43);
    });

    test("then the verifier contains only unreserved characters", async () => {
      const { verifier, challenge } = await page.evaluate(() =>
        verifierAndChallenge.make()
      );
      expect(verifier.split("").map(isUnreserved)).toBeTruthy();
    });

    test("then the verifier contains only unreserved characters", async () => {
      const { verifier, challenge } = await page.evaluate(() =>
        verifierAndChallenge.make()
      );
      expect(challenge.split("").map(isUnreserved)).toBeTruthy();
    });
  });
});

function isUnreserved(character) {
  return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-_~".includes(
    character
  );
}
