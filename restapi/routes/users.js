const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");

const { User } = require("../models");
const { isObjectEmpty, validateEmail } = require("../utils/helper");

const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  updatePasswordSchema,
} = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //register
  fastify.post(
    "/register",
    { schema: registerSchema },
    async (request, reply) => {
      const { name, age, email, username, password } = request.body;
      const errors = {};

      // check null values
      if (!name || !age || !email || !username || !password)
        errors.required = "A *-al jelölt mezők megadása kötelező";

      // check age
      if (age < 14) errors.age = "Korhatár: 14év";

      // check email format
      if (!validateEmail(email)) errors.email = "Nem jó e-mail formátum";

      // check if user exists
      const [takenEmail, takenUsername] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { username } }),
      ]);

      if (takenEmail) errors.email = "E-mail már használatban";
      if (takenUsername) errors.username = "Foglalt";

      // check password length (>6)
      if (password.length < 6) errors.password = "Jelszó legalább 6 karakter";

      if (!isObjectEmpty(errors)) {
        return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
      }

      const user = await User.create({
        name,
        age,
        email,
        username,
        password,
      });

      // TODO: remove user from reply
      reply.send({ message: "User registered successfully!", user });
    }
  );

  //login
  fastify.post("/login", { schema: loginSchema }, async (request, reply) => {
    const { username, password } = request.body;
    const errors = {};

    // check null values
    if (!username || !password)
      errors.required = "A *-al jelölt mezők megadása kötelező";

    // check if user exists
    const user = await User.findOne({
      where: { username },
    });
    if (!user) errors.notfound = "A felhasználó nem található";

    // check password length (>6)
    if (password.length < 6) errors.password = "Jelszó legalább 6 karakter";

    // we need to return here because if user is null the user.password is also null later, which results in: internal server error
    if (!isObjectEmpty(errors)) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
    }

    // check if password matches saved one
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) errors.password = "Helytelen jelszó";

    if (!isObjectEmpty(errors)) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ error: errors });
    }

    //Create token
    const token = fastify.jwt.sign(
      { id: user.id, username: username },
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

  //view-profile
  fastify.get(
    "/view-profile",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const user = request.user;
      reply.send(user);
    }
  );

  //update-profile
  fastify.patch(
    "/update-profile",
    { schema: updateProfileSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const userId = request.user.id;
      const { name, age, username, email } = request.body;

      const user = await User.findByPk(userId);

      //Only the give attributes should be changed
      if (name) user.name = name;
      if (age) user.age = age;
      //Check if username exists
      if (username) {
        const existtingUsername = await User.findOne({ where: { username } });

        if (existtingUsername && existtingUsername.id != userId) {
          return reply
            .status(StatusCodes.CONFLICT)
            .send({ error: "Username is taken!" });
        }
        user.username = username;
      }
      //Check if email exists
      if (email) {
        const existingEmail = await User.findOne({ where: { email } });

        if (existingEmail && existingEmail.id != userId) {
          return reply
            .status(StatusCodes.CONFLICT)
            .send({ error: "Email is taken!" });
        }
        user.email = email;
      }

      await user.save();

      reply.clearCookie("token").send({
        message: "Profile updated successfully!",
        user: {
          id: user.id,
          name: user.name,
          age: user.age,
          username: user.username,
          email: user.email,
        },
      });
    }
  );

  //update-password
  fastify.patch(
    "/update-password",
    {
      schema: updatePasswordSchema,
      onRequest: [fastify.auth],
    },
    async (request, reply) => {
      const userId = request.user.id;
      const user = await User.findByPk(userId);
      const { oldPassword, newPassword } = request.body;

      const isPasswordMatch = await argon2.verify(user.password, oldPassword);
      if (!isPasswordMatch) {
        reply
          .status(StatusCodes.CONFLICT)
          .send({ message: "Old password does not match!" });
      }

      const hashedPassword = await argon2.hash(newPassword, {
        type: argon2.argon2id,
      });
      user.password = hashedPassword;
      await user.save();

      reply
        .clearCookie("token")
        .send({ message: "Password changed successfully!" });
    }
  );

  //delete-profile
  fastify.delete(
    "/delete-profile",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const id = request.user.id;
      await User.destroy({ where: { id } });

      reply.clearCookie("token").send({
        message: `Deleted a user with an id of ${id}! Cleared token from cookie.`,
      });
    }
  );
};
