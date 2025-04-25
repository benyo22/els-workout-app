const fastifyCors = require("@fastify/cors");
require("dotenv/config");

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? false
    : ["http://localhost:5173", "http://192.168.1.125:5173"];

const corsConfig = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

module.exports = { corsConfig, fastifyCors };
