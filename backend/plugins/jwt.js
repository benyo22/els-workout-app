const fastifyJwt = require("@fastify/jwt");

const jwtConfig = {
  secret: "secret",
  cookie: {
    cookieName: "token",
    signed: true,
  },
};

module.exports = { fastifyJwt, jwtConfig };
