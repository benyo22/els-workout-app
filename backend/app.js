require("dotenv").config();
const Fastify = require("fastify");
const { autoload, autoLoadConfig } = require("./plugins/autoload.js");
const { cookieConfig, fastifyCookie } = require("./plugins/cookie.js");
const { corsConfig, fastifyCors } = require("./plugins/cors.js");
const { fastifyJwt, jwtConfig } = require("./plugins/jwt.js");
const {
  fastifyStatic,
  fastifyStaticConfig,
} = require("./plugins/fastifyStatic.js");
const { rateLimitConfig, rateLimit } = require("./plugins/rateLimit.js");

const fastify = Fastify({ logger: true });

fastify.register(rateLimit, rateLimitConfig);
fastify.register(fastifyCors, corsConfig);
fastify.register(autoload, autoLoadConfig);
fastify.register(fastifyCookie, cookieConfig);
fastify.register(fastifyJwt, jwtConfig);
fastify.register(fastifyStatic, fastifyStaticConfig);

fastify.decorate("auth", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

module.exports = { fastify };
