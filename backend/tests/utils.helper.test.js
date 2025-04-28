const { isObjectEmpty, validateEmail } = require("../utils/helper");

describe("utils helper test", () => {
  it("should be true if email is correct format", async () => {
    const email = "teszt@teszt.com";

    expect(validateEmail(email)).toBeTruthy();
  });

  it("should be false if email is incorrect format", async () => {
    const email = "teszt@tesztcom";

    expect(validateEmail(email)).toBeFalsy();
  });

  it("should be false if object is empty", async () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });

  it("should be true if object is not empty", async () => {
    expect(isObjectEmpty({ asd: "asd" })).toBeFalsy();
  });
});
