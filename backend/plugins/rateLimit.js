const rateLimit = require("@fastify/rate-limit");

const rateLimitConfig = {
  max: 200,
  timeWindow: "1 minute",
  errorResponseBuilder: (request, context) => {
    return {
      statusCode: 429,
      error: "Túl sok kérés érkezett. Kérlek, próbáld meg újra később!",
      message: "Too Many Requests",
    };
  },
};

module.exports = { rateLimit, rateLimitConfig };
