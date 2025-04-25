const fastifyCors = require("@fastify/cors");
require("dotenv/config");

const corsConfig = {
  origin: process.env.CORS_ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

module.exports = { corsConfig, fastifyCors };
