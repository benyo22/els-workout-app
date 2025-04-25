const autoload = require("@fastify/autoload");
const { join } = require("path");

const autoLoadConfig = {
  dir: join(__dirname, "../routes"),
  options: {
    prefix: "/api",
  },
};

module.exports = { autoload, autoLoadConfig };
