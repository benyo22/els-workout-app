const chalk = require("chalk");
require("dotenv/config");
const Fastify = require("fastify");
const { autoload, autoLoadConfig } = require("./plugins/autoload.js");
const { cookieConfig, fastifyCookie } = require("./plugins/cookie.js");
const { corsConfig, fastifyCors } = require("./plugins/cors.js");
const { fastifyJwt, jwtConfig } = require("./plugins/jwt.js");
const {
  fastifyStatic,
  fastifyStaticConfig,
} = require("./plugins/fastifyStatic.js");
const { rateLimit, rateLimitConfig } = require("./plugins/rateLimit.js");

const fastify = Fastify({ logger: true });

fastify.register(rateLimit, rateLimitConfig);
fastify.register(fastifyCors, corsConfig);
fastify.register(autoload, autoLoadConfig);
fastify.register(fastifyCookie, cookieConfig);
fastify.register(fastifyJwt, jwtConfig);
fastify.register(fastifyStatic, fastifyStaticConfig);

fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html");
});

fastify.decorate("auth", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

const port = 3000;
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(chalk.green("Fastify fastify runs on:", address));
});
