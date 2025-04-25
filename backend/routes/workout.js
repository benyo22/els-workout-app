const { createWorkoutSchema } = require("../schemas/workoutSchemas");
const {
  handleGetAllWorkouts,
  handleCreateWorkout,
  handleFinishWorkout,
  handleUpdateWorkout,
  handleDeletWorkout,
} = require("../controllers/workoutController");

module.exports = async (fastify, options) => {
  fastify.get(
    "/workout/:userId",
    { onRequest: [fastify.auth] },
    handleGetAllWorkouts
  );
  fastify.post(
    "/workout/:userId",
    { schema: createWorkoutSchema, onRequest: [fastify.auth] },
    handleCreateWorkout
  );
  fastify.patch(
    "/finish-workout/:workoutId",
    { onRequest: [fastify.auth] },
    handleFinishWorkout
  );
  fastify.patch(
    "/workout-update/:workoutId",
    { schema: createWorkoutSchema, onRequest: [fastify.auth] },
    handleUpdateWorkout
  );
  fastify.delete(
    "/workout/:workoutId",
    { onRequest: [fastify.auth] },
    handleDeletWorkout
  );
};
