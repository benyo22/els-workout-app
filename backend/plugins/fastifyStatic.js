const path = require("path");
const fastifyStatic = require("@fastify/static");

const fastifyStaticConfig = {
  root: path.join(__dirname, "../../frontend/dist"),
  prefix: "/",
  wildcard: false,
};

module.exports = { fastifyStatic, fastifyStaticConfig };
