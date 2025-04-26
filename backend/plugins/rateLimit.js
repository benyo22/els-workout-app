const rateLimit = require("@fastify/rate-limit");

const rateLimitConfig = {
  max: 150,
  timeWindow: "1 minute",
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: "Túl sok kérés! Próbáld meg újra később.",
      message: "Too Many Requests",
    };
  },
};

module.exports = { rateLimit, rateLimitConfig };
