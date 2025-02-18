const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const argon2 = require("argon2");
const { where } = require("sequelize");

module.exports = async (fastify, options) => {
  //register
  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "age", "email", "username", "password"],
          properties: {
            name: { type: "string" },
            age: { type: "integer" },
            email: { type: "string", format: "email" },
            username: { type: "string" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, age, email, username, password } = request.body;

      // Check if user exists
      const [takenEmail, takenUsername] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { username } }),
      ]);

      if (takenEmail || takenUsername) {
        return reply.status(StatusCodes.CONFLICT).send({
          error: takenEmail
            ? "Email already taken!"
            : "Username already taken!",
        });
      }

      const user = await User.create({
        name,
        age,
        email,
        username,
        password,
      });

      reply.send({ message: "User registered successfully!", user });
    }
  );

  //login
  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["password"],
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          anyOf: [{ required: ["username"] }, { required: ["email"] }],
        },
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body;

      //Check if user exists
      const user = await User.findOne({
        where: username ? { username } : { email },
      });
      if (!user) {
        reply
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Invalid email or username!" });
      }

      //Check password
      const isPasswordMatch = await argon2.verify(user.password, password);
      if (!isPasswordMatch) {
        reply
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Invalid password!" });
      }

      //Create token
      const token = fastify.jwt.sign(user.toJSON(), { expiresIn: "1h" });
      reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          path: "/",
          maxAge: 3600,
          signed: true,
        })
        .send({ message: "Login successful!" });
    }
  );

  //logout
  fastify.post("/logout", async (request, reply) => {
    reply.clearCookie("token").send({ message: "Logged out successfully!" });
  });

  //view-profile
  fastify.get(
    "/view-profile",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const user = request.user;
      reply.send(user);
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
