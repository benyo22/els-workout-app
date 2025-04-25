const {
  handleCreateWeight,
  handleDeleteWeight,
  handleGetAllWeight,
  handleUpdateWeight,
} = require("../controllers/weightController");
const { createWeightSchema } = require("../schemas/weightSchemas");

module.exports = async (fastify, options) => {
  fastify.get(
    "/weight/:userId",
    { onRequest: [fastify.auth] },
    handleGetAllWeight
  );
  fastify.post(
    "/weight/:userId",
    { schema: createWeightSchema, onRequest: [fastify.auth] },
    handleCreateWeight
  );
  fastify.put(
    "/weight/:weightId",
    { schema: createWeightSchema, onRequest: [fastify.auth] },
    handleUpdateWeight
  );
  fastify.delete(
    "/weight/:weightId",
    { onRequest: [fastify.auth] },
    handleDeleteWeight
  );
};
