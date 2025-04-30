const fastifyCookie = require("@fastify/cookie");

const cookieConfig = {
  secret: "hypersupersecretcookie",
};

module.exports = { cookieConfig, fastifyCookie };
