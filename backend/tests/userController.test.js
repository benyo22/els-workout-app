const argon2 = require("argon2");
const { User } = require("../models/index");
const {
  handleGetUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleDeleteUser,
} = require("../controllers/userController");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  PASSWORD_DONT_MATCH_ERROR,
} = require("../utils/error");
const { DELETED_MESSAGE, UPDATED_MESSAGE } = require("../utils/data");
const { errorReply, updatedReply, deletedReply } = require("../utils/reply");
const { validateEmail, isObjectEmpty } = require("../utils/helper");

jest.mock("../models/index");
jest.mock("argon2");
jest.mock("../utils/reply");
jest.mock("../utils/helper");

describe("userController tests", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { id: 1 },
      body: {
        name: "Teszt Elek",
        username: "tesztelek",
        email: "teszt.elek@teszt.com",
        age: 25,
        oldPassword: "oldpassword",
        newPassword: "newpassword123",
      },
    };
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user details", async () => {
    const user = {
      id: 1,
      name: "Teszt Elek",
      email: "teszt.elek@teszt.com",
      username: "tesztelek",
      password: "asd",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
      get: jest.fn().mockReturnValue({
        id: 1,
        name: "Teszt Elek",
        email: "teszt.elek@teszt.com",
        username: "tesztelek",
        password: "jelszo123",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      }),
    };

    User.findByPk.mockResolvedValue(user);

    await handleGetUser(request, reply);

    expect(reply.send).toHaveBeenCalledWith({
      name: "Teszt Elek",
      email: "teszt.elek@teszt.com",
      username: "tesztelek",
    });
  });

  it("should update user details", async () => {
    const mockUser = {
      id: 1,
      name: "Teszt Elek",
      username: "tesztelek",
      email: "teszt.elek@teszt.com",
      age: 25,
      save: jest.fn(),
    };
    User.findByPk.mockResolvedValue(mockUser);
    validateEmail.mockReturnValue(true);
    isObjectEmpty.mockReturnValue(true);

    await handleUpdateUser(request, reply);

    expect(mockUser.save).toHaveBeenCalled();
    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should update user password", async () => {
    const mockUser = { id: 1, password: "hashedpassword", save: jest.fn() };
    User.findByPk.mockResolvedValue(mockUser);
    argon2.verify.mockResolvedValue(true);
    argon2.hash.mockResolvedValue("newHashedPassword");

    await handleUpdatePassword(request, reply);

    expect(mockUser.save).toHaveBeenCalled();
    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should delete user successfully", async () => {
    const mockUser = { id: 1, password: "hashedpassword", destroy: jest.fn() };
    request.body = { password: "jelszo123" };
    User.findByPk.mockResolvedValue(mockUser);
    argon2.verify.mockResolvedValue(true);

    await handleDeleteUser(request, reply);

    expect(mockUser.destroy).toHaveBeenCalled();
    expect(deletedReply).toHaveBeenCalledWith(reply, 200, DELETED_MESSAGE);
  });
});
