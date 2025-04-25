const chalk = require("chalk");
require("dotenv/config");
const Fastify = require("fastify");
const { autoload, autoLoadConfig } = require("./plugins/autoload.js");
const { cookieConfig, fastifyCookie } = require("./plugins/cookie.js");
const { corsConfig, fastifyCors } = require("./plugins/cors.js");
const { fastifyJwt, jwtConfig } = require("./plugins/jwt.js");

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, corsConfig);
fastify.register(autoload, autoLoadConfig);
fastify.register(fastifyCookie, cookieConfig);
fastify.register(fastifyJwt, jwtConfig);

fastify.decorate("auth", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

const port = process.env.FASTIFY_PORT;
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(chalk.green("Fastify fastify runs on:", address));
});
