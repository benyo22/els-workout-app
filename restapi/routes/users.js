const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const argon2 = require("argon2");
const { where } = require("sequelize");

module.exports = async (fastify, options) => {
  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "username", "email", "password"],
          properties: {
            name: { type: "string" },
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, username, email, password } = request.body;

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
        username,
        email,
        password,
      });

      reply.send({ message: "User registered successfully!", user });
    }
  );

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

      const user = await User.findOne({
        where: username ? { username } : { email },
      });
      if (!user) {
        reply
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Invalid email or username!" });
      }

      const isPasswordMatch = await argon2.verify(user.password, password);
      if (!isPasswordMatch) {
        reply
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Invalid password!" });
      }
      const token = fastify.jwt.sign(user.toJSON(), { expiresIn: "1h" });
      reply.send({ message: "Login successful!", token });
    }
  );

  fastify.get(
    "/profile",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const user = request.user;
      reply.send(user);
    }
  );

  fastify.delete(
    "/del-profile",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const id = request.user.id;
      await User.destroy({ where: { id } });

      reply.send(`Deleted a user with an id of ${id}!`);
    }
  );
};
