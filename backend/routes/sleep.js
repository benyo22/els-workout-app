const {
  handleCreateSleep,
  handleDeleteSleep,
  handleGetAllSleep,
  handleUpdateSleep,
} = require("../controllers/sleepController");
const { createSleepSchema } = require("../schemas/sleepSchemas");

module.exports = async (fastify, options) => {
  fastify.get(
    "/sleep/:userId",
    { onRequest: [fastify.auth] },
    handleGetAllSleep
  );
  fastify.post(
    "/sleep/:userId",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    handleCreateSleep
  );
  fastify.put(
    "/sleep/:sleepId",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    handleUpdateSleep
  );
  fastify.delete(
    "/sleep/:sleepId",
    { onRequest: [fastify.auth] },
    handleDeleteSleep
  );
};
