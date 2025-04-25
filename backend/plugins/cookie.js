const fastifyCookie = require("@fastify/cookie");

const cookieConfig = {
  secret: "secret",
};

module.exports = { cookieConfig, fastifyCookie };
