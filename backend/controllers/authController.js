const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/index");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  PASSWORD_DONT_MATCH_ERROR,
} = require("../utils/error");
const {
  REGISTER_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
} = require("../utils/data");
const { errorReply, createdReply } = require("../utils/reply");
const { isObjectEmpty, validateEmail } = require("../utils/helper");

const handleRegister = async (request, reply) => {
  const { name, age, email, username, password } = request.body;
  const errors = {};

  if (!name || !age || !email || !username || !password) {
    errors.required = ALL_REQUIRED_ERROR;
  }

  if (username.length > 15) errors.username = "Max hossz: 15!";
  if (age < 14) errors.age = "Korhatár: 14év!";
  if (age > 99) errors.age = "Max 99 év!";
  if (!validateEmail(email)) errors.email = "Nem jó e-mail formátum!";
  if (password.length < 6) errors.password = "Jelszó legalább 6 karakter!";

  // check if email or username is already taken
  const [takenEmail, takenUsername] = await Promise.all([
    User.findOne({ where: { email } }),
    User.findOne({ where: { username } }),
  ]);

  if (takenEmail) errors.email = "E-mail már használatban!";
  if (takenUsername) errors.username = "Foglalt!";

  if (!isObjectEmpty(errors)) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, errors);
  }

  await User.create({ name, age, email, username, password });
  return createdReply(reply, StatusCodes.CREATED, REGISTER_MESSAGE);
};

const handleLogin = async (request, reply) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const trimmedUsername = username.trim();
  const user = await User.findOne({
    where: { username: trimmedUsername },
  });
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  // verify password
  const isPasswordMatch = await argon2.verify(user.password, password);
  if (!isPasswordMatch) {
    return errorReply(
      reply,
      StatusCodes.BAD_REQUEST,
      PASSWORD_DONT_MATCH_ERROR
    );
  }

  const token = request.server.jwt.sign(
    { id: user.id, username },
    { expiresIn: "8h" }
  );

  return reply
    .setCookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/",
      maxAge: 28800,
      signed: true,
    })
    .send({ message: LOGIN_MESSAGE, id: user.id, username });
};

const handleLogout = async (request, reply) => {
  return reply.clearCookie("token").send({ message: LOGOUT_MESSAGE });
};

module.exports = { handleRegister, handleLogin, handleLogout };
