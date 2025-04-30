const fastifyJwt = require("@fastify/jwt");

const jwtConfig = {
  secret: "hypersupersecretjwt",
  cookie: {
    cookieName: "token",
    signed: false,
  },
};

module.exports = { fastifyJwt, jwtConfig };
