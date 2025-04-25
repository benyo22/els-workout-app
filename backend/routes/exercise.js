const {
  handleAddExerciseToWorkout,
  handleCreateExercise,
  handleGetAllExercises,
  handleGetExercisesInWorkout,
  handleRemoveExerciseFromWorkout,
} = require("../controllers/exerciseController");
const { createExerciseSchema } = require("../schemas/exerciseSchemas");

module.exports = async (fastify, options) => {
  fastify.get(
    "/exercises",
    { onRequest: [fastify.auth] },
    handleGetAllExercises
  );
  fastify.get(
    "/exercises-in-workout/:workoutId",
    { onRequest: [fastify.auth] },
    handleGetExercisesInWorkout
  );
  fastify.post(
    "/exercises",
    { schema: createExerciseSchema, onRequest: [fastify.auth] },
    handleCreateExercise
  );
  fastify.post(
    "/add-exercise-to-workout/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    handleAddExerciseToWorkout
  );
  fastify.delete(
    "/remove-exercise-from-workout/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    handleRemoveExerciseFromWorkout
  );
};
