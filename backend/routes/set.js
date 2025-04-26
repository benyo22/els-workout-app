const {
  bulkUpdateSetSchema,
  createSetSchema,
} = require("../schemas/setSchemas");
const {
  handleGetSetsInExercise,
  handleAddSetToExercise,
  handleUpdateSet,
  handleBulkUpdateSets,
  handleDeleteSet,
  handleDeleteAllSetsInExercise,
} = require("../controllers/setController");

module.exports = async (fastify, options) => {
  fastify.get(
    "/sets-in-exercise/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    handleGetSetsInExercise
  );
  fastify.post(
    "/add-set-to-exercise/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    handleAddSetToExercise
  );
  fastify.patch(
    "/update-set/:setId",
    { schema: createSetSchema, onRequest: [fastify.auth] },
    handleUpdateSet
  );
  fastify.patch(
    "/update-multiple-sets",
    {
      schema: bulkUpdateSetSchema,
      onRequest: [fastify.auth],
    },
    handleBulkUpdateSets
  );
  fastify.delete(
    "/delete-set/:setId",
    { onRequest: [fastify.auth] },
    handleDeleteSet
  );
  fastify.delete(
    "/delete-all-sets-in-exercise/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    handleDeleteAllSetsInExercise
  );
};
