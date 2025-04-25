const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");
const omit = require("object.omit");
const { User } = require("../models/index");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  PASSWORD_DONT_MATCH_ERROR,
} = require("../utils/error");
const { DELETED_MESSAGE, UPDATED_MESSAGE } = require("../utils/data");
const { errorReply, deletedReply, updatedReply } = require("../utils/reply");
const { isObjectEmpty, validateEmail } = require("../utils/helper");

const handleGetUser = async (request, reply) => {
  const { id } = request.params;
  const user = await User.findByPk(id);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  //convert to plain object so omit works on it
  const userObject = user.get({ plain: true });
  const filteredUser = omit(userObject, [
    "id",
    "password",
    "createdAt",
    "updatedAt",
  ]);

  return reply.send(filteredUser);
};

const handleUpdateUser = async (request, reply) => {
  const { id } = request.params;
  const { name, age, username, email } = request.body;
  const errors = {};

  const user = await User.findByPk(id);
  if (!user) {
    errors.username = USER_NOT_FOUND_ERROR;
  }

  // update name if provided
  if (name) user.name = name;

  // validate and update age
  if (age) {
    if (age < 14) errors.age = "Korhatár: 14év!";
    else if (age > 99) errors.age = "Max 99 év!";
    else if (age === 0) user.age = user.age;
    else user.age = age;
  }

  // validate and update username
  if (username) {
    if (username.length > 15) {
      errors.username = "Max hossz: 15!";
    } else {
      const existingUsername = await User.findOne({
        where: { username },
      });
      if (existingUsername && existingUsername.id !== user.id) {
        errors.username = "Foglalt!";
      } else {
        user.username = username;
      }
    }
  }

  // validate and update email
  if (email) {
    if (!validateEmail(email)) {
      errors.email = "Nem jó e-mail formátum!";
    } else {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== user.id) {
        errors.email = "E-mail használatban!";
      } else {
        user.email = email;
      }
    }
  }

  if (!isObjectEmpty(errors)) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, errors);
  }

  await user.save();

  return updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleUpdatePassword = async (request, reply) => {
  const { id } = request.params;
  const { oldPassword, newPassword } = request.body;
  if (!oldPassword || !newPassword) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const user = await User.findByPk(id);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  if (!(await argon2.verify(user.password, oldPassword))) {
    return errorReply(
      reply,
      StatusCodes.BAD_REQUEST,
      PASSWORD_DONT_MATCH_ERROR
    );
  }

  if (newPassword.length < 6) {
    return errorReply(
      reply,
      StatusCodes.BAD_REQUEST,
      "Jelszó legalább 6 karakter!"
    );
  }

  user.password = await argon2.hash(newPassword, { type: argon2.argon2id });
  await user.save();

  return updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleDeleteUser = async (request, reply) => {
  const { id } = request.params;
  const { password } = request.body;
  const user = await User.findByPk(id);
  if (!password) {
    return errorReply(
      reply,
      StatusCodes.BAD_REQUEST,
      PASSWORD_DONT_MATCH_ERROR
    );
  }

  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  // check if password matches saved one
  const isPasswordMatch = await argon2.verify(user.password, password);
  if (!isPasswordMatch) {
    return errorReply(
      reply,
      StatusCodes.BAD_REQUEST,
      PASSWORD_DONT_MATCH_ERROR
    );
  }

  await user.destroy();

  return deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleGetUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleDeleteUser,
};
