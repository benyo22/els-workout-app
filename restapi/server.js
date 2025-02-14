const autoload = require("@fastify/autoload");
const { join } = require("path");
const chalk = require("chalk");
require("dotenv").config();

const fastify = require("fastify")({
  logger: true,
});

// Load routes automatically -> scalability
fastify.register(autoload, {
  dir: join(__dirname, "routes"),
});

// JWT auth
const secret = process.env.JWT_SECRET;
fastify.register(require("@fastify/jwt"), {
  secret,
});

fastify.decorate("auth", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Start fastify app on port
const port = process.env.FASTIFY_PORT;
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(chalk.green("Fastify app runs:", address));
});
