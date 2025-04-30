const { isObjectEmpty, validateEmail } = require("../utils/helper");
const {
  createdReply,
  deletedReply,
  errorReply,
  removedReply,
  updatedReply,
} = require("../utils/reply");

jest.mock("../utils/reply");

describe("utils helper test", () => {
  let message;
  let reply;
  let code;

  beforeEach(() => {
    message = "MESSAGE";
    reply = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    code = 200;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be true if email is correct format", async () => {
    const email = "teszt@teszt.com";

    expect(validateEmail(email)).toBeTruthy();
  });

  it("should be false if email is incorrect format", async () => {
    const email = "teszt@tesztcom";

    expect(validateEmail(email)).toBeFalsy();
  });

  it("should be true if object is empty", async () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });

  it("should be false if object is not empty", async () => {
    expect(isObjectEmpty({ test: "test data" })).toBeFalsy();
  });

  it("createdReply should work ok", async () => {
    createdReply(reply, code, message);
    expect(createdReply).toHaveBeenCalledWith(reply, code, message);
  });

  it("deletedReply should work ok", async () => {
    deletedReply(reply, code, message);
    expect(deletedReply).toHaveBeenCalledWith(reply, code, message);
  });

  it("errorReply should work ok", async () => {
    errorReply(reply, code, message);
    expect(errorReply).toHaveBeenCalledWith(reply, code, message);
  });

  it("updatedReply should work ok", async () => {
    updatedReply(reply, code, message);
    expect(updatedReply).toHaveBeenCalledWith(reply, code, message);
  });

  it("removedReply should work ok", async () => {
    removedReply(reply, code, message);
    expect(removedReply).toHaveBeenCalledWith(reply, code, message);
  });
});
