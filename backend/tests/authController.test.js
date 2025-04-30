const {
  handleRegister,
  handleLogout,
  handleLogin,
} = require("../controllers/authController");
const argon2 = require("argon2");
const {
  LOGOUT_MESSAGE,
  REGISTER_MESSAGE,
  LOGIN_MESSAGE,
} = require("../utils/data");
const { User } = require("../models");

jest.mock("../models");
jest.mock("argon2");

describe("authController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      body: {
        name: "Teszt",
        age: 25,
        email: "teszt.elek@teszt.com",
        username: "tesztelek",
        password: "jelszo123",
      },
      server: {
        jwt: {
          sign: jest.fn().mockReturnValue("fake-jwt-token"),
        },
      },
    };
    reply = {
      setCookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 CREATED if register is successfull", async () => {
    User.create.mockResolvedValue({});

    await handleRegister(request, reply);

    expect(User.create).toHaveBeenCalledWith(request.body);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      message: REGISTER_MESSAGE,
    });
  });

  it("should set cookie if login is successful", async () => {
    const userFromDB = {
      id: 1,
      username: "tesztelek",
      password: "hashedpassword",
    };

    User.findOne.mockResolvedValue(userFromDB);
    argon2.verify.mockResolvedValue(true);

    await handleLogin(request, reply);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { username: "tesztelek" },
    });

    expect(argon2.verify).toHaveBeenCalledWith(
      userFromDB.password,
      request.body.password
    );

    expect(reply.setCookie).toHaveBeenCalledWith("token", "fake-jwt-token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 28800,
    });
    expect(reply.send).toHaveBeenCalledWith({
      message: LOGIN_MESSAGE,
      id: userFromDB.id,
      username: userFromDB.username,
    });
  });

  it("should logout successfully", async () => {
    await handleLogout(request, reply);
    expect(reply.send).toHaveBeenCalledWith({
      message: LOGOUT_MESSAGE,
    });
  });
});
