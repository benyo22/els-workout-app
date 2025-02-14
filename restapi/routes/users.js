const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = async (fastify, options) => {
  fastify.get(
    "/user:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const user = request.user;
      reply.send(user);
    }
  );

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
      const takenEmail = await User.findOne({
        where: { email },
      });
      if (takenEmail) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Email already taken!" });
      }

      const takenUsername = await User.findOne({
        where: { username },
      });
      if (takenUsername) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Username already taken!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
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

      const isPasswordMatch = bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        reply
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Invalid password!" });
      }
      const token = fastify.jwt.sign(
        { id: user.id, username: user.username },
        { expiresIn: "1h" }
      );
      reply.send({ message: "Login successful!", token });
    }
  );
};
