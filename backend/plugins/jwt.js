const fastifyJwt = require("@fastify/jwt");

const jwtConfig = {
  secret: "secret",
  cookie: {
    cookieName: "token",
    signed: false,
  },
};

module.exports = { fastifyJwt, jwtConfig };
