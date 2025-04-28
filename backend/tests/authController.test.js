const {
  handleRegister,
  handleLogout,
} = require("../controllers/authController");
const { StatusCodes } = require("http-status-codes");
const { LOGOUT_MESSAGE, REGISTER_MESSAGE } = require("../utils/data");

jest.mock("../models");

describe("authController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        name: "Teszt Elek",
        age: 25,
        email: "teszt.elek@teszt.com",
        username: "tesztelek",
        password: "jelszo123",
      },
    };
    reply = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if email format is not correct", async () => {
    request.body = {
      name: "asd",
      age: 22,
      email: "asdasd",
      username: "johnny",
      password: "password123",
    };

    await handleRegister(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Object),
      })
    );
  });

  it("should return an error if username is too long", async () => {
    request.body.username = "a".repeat(16);

    await handleRegister(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Object),
      })
    );
  });

  it("should return an error if age is below 14 or above 99", async () => {
    request.body.age = 13;

    await handleRegister(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Object),
      })
    );
  });

  it("should return an error if password is too short", async () => {
    request.body.password = "12345";

    await handleRegister(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Object),
      })
    );
  });

  it("should return 200 OK if logout is successfull", async () => {
    await handleLogout(request, reply);

    expect(reply.send).toHaveBeenCalledWith({
      message: LOGOUT_MESSAGE,
    });
  });
});
