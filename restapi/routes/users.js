const argon2 = require("argon2");
var omit = require("object.omit");
const { StatusCodes } = require("http-status-codes");

const { User } = require("../models");
const { isObjectEmpty, validateEmail } = require("../utils/helper");

const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
  getUserSchema,
  deleteUserSchema,
} = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //register
  fastify.post(
    "/register",
    { schema: registerSchema },
    async (request, reply) => {
      const { name, age, email, username, password } = request.body;
      const errors = {};

      // validate input fields
      if (!name || !age || !email || !username || !password) {
        errors.required = "A *-al jelölt mezők megadása kötelező";
      }
      if (username.length > 15) errors.username = "Max hossz: 15";
      if (age < 14) errors.age = "Korhatár: 14év";
      if (age > 99) errors.age = "Max 99 év";
      if (!validateEmail(email)) errors.email = "Nem jó e-mail formátum";
      if (password.length < 6) errors.password = "Jelszó legalább 6 karakter";

      // check if email or username is already taken
      const [takenEmail, takenUsername] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { username } }),
      ]);

      if (takenEmail) errors.email = "E-mail már használatban";
      if (takenUsername) errors.username = "Foglalt";

      if (!isObjectEmpty(errors)) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
      }

      await User.create({ name, age, email, username, password });
      reply
        .status(StatusCodes.CREATED)
        .send({ message: "User registered successfully!" });
    }
  );

  //login
  fastify.post("/login", { schema: loginSchema }, async (request, reply) => {
    const { username, password } = request.body;
    const errors = {};

    // validate input
    if (!username || !password)
      errors.required = "A *-al jelölt mezők megadása kötelező";

    const user = await User.findOne({ where: { username } });
    if (!user) errors.username = "A felhasználó nem található";

    // return early if there are errors
    if (!isObjectEmpty(errors))
      return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });

    // verify password
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        error: { password: "Helytelen jelszó" },
      });
    }

    const token = fastify.jwt.sign(
      { id: user.id, username },
      { expiresIn: "1h" }
    );

    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 3600,
        signed: true,
      })
      .send({ message: "Login successful!", id: user.id, username });
  });

  //logout
  fastify.post(
    "/logout",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      reply.clearCookie("token").send({ message: "Logged out successfully!" });
    }
  );

  //user/:id
  fastify.get(
    "/user/:id",
    { schema: getUserSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const user = await User.findByPk(id);

      //convert to plain object so omit works on it
      const userObject = user.get({ plain: true });
      const filteredUser = omit(userObject, [
        "id",
        "password",
        "createdAt",
        "updatedAt",
      ]);

      reply.send(filteredUser);
    }
  );

  //update-user/:id
  fastify.patch(
    "/update-user/:id",
    { schema: updateUserSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const { name, age, username, email } = request.body;

      const user = await User.findByPk(id);
      const errors = {};

      // update name if provided
      if (name) user.name = name;

      // validate and update age
      if (age) {
        if (age < 14) errors.age = "Korhatár: 14év";
        else if (age > 99) errors.age = "Max 99 év";
        else if (age === 0) user.age = user.age;
        else user.age = age;
      }

      // validate and update username
      if (username) {
        if (username.length > 15) {
          errors.username = "Max hossz: 15";
        } else {
          const existingUsername = await User.findOne({ where: { username } });
          if (existingUsername && existingUsername.id !== user.id) {
            errors.username = "Foglalt";
          } else {
            user.username = username;
          }
        }
      }

      // validate and update email
      if (email) {
        if (!validateEmail(email)) {
          errors.email = "Nem jó e-mail formátum";
        } else {
          const existingEmail = await User.findOne({ where: { email } });
          if (existingEmail && existingEmail.id !== user.id) {
            errors.email = "E-mail használatban";
          } else {
            user.email = email;
          }
        }
      }

      if (!isObjectEmpty(errors)) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
      }

      await user.save();

      reply.send({ message: "User updated successfully!" });
    }
  );

  //update-password/:id
  fastify.patch(
    "/update-password/:id",
    {
      schema: updatePasswordSchema,
      onRequest: [fastify.auth],
    },
    async (request, reply) => {
      const { id } = request.params;
      const { oldPassword, newPassword } = request.body;

      if (!oldPassword || !newPassword) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          error: { required: "A *-al jelölt mezők megadása kötelező" },
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return reply.status(StatusCodes.NOT_FOUND).send({
          error: { user: "Felhasználó nem található" },
        });
      }

      if (!(await argon2.verify(user.password, oldPassword))) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          error: { password: "Helytelen régi jelszó" },
        });
      }

      if (newPassword.length < 6) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          error: { password: "Jelszó legalább 6 karakter" },
        });
      }

      user.password = await argon2.hash(newPassword, { type: argon2.argon2id });
      await user.save();

      reply.send({ message: "Password changed successfully!" });
    }
  );

  //delete user
  fastify.delete(
    "/user/:id",
    { schema: deleteUserSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const { password } = request.body;
      const user = await User.findByPk(id);
      const errors = {};

      // check if password matches saved one
      const isPasswordMatch = await argon2.verify(user.password, password);
      if (!isPasswordMatch) errors.delete = "Helytelen jelszó";

      if (!isObjectEmpty(errors)) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
      }

      await User.destroy({ where: { id } });

      reply.send({
        message: `Deleted a user with an id of ${id}!`,
      });
    }
  );
};
