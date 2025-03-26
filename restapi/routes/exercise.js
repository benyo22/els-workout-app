const { StatusCodes } = require("http-status-codes");
const { Exercise, Workout } = require("../models"); // Adjust the path as needed
const { createExerciseSchema } = require("../utils/fastify.schemas");
const { isGoodBodyPart, isGoodCategory } = require("../utils/helper");

module.exports = async (fastify, options) => {
  // get all exercises
  fastify.get(
    "/exercises",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const exercises = await Exercise.findAll();
      reply.send(exercises);
    }
  );

  //TODO: if i have time
  // // get exercise by id
  // fastify.get(
  //   "/exercises/:id",
  //   { onRequest: [fastify.auth] },
  //   async (request, reply) => {
  //     const { id } = request.params;
  //     const exercise = await Exercise.findByPk(id);

  //     reply.send(exercise);
  //   }
  // );

  // get all exercise in a workout by workoutId
  fastify.get(
    "/workout-exercises/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { workoutId } = request.params;

      const workout = await Workout.findByPk(workoutId, {
        include: {
          model: Exercise,
          through: { attributes: [] }, // exclude pivot table attributes
        },
      });

      reply.send(workout.Exercises);
    }
  );

  // create a new exercise
  fastify.post(
    "/exercises",
    { schema: createExerciseSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { name, bodyPart, category } = request.body;

      if (!name) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Név megadása kötelező!" });
      }

      if (!isGoodBodyPart(bodyPart)) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Érvénytelen testrész!" });
      }

      if (!isGoodCategory(category)) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Érvénytelen kategória!" });
      }

      await Exercise.create({
        name,
        bodyPart,
        category,
      });

      reply.status(StatusCodes.CREATED);
    }
  );

  // update an exercise
  // fastify.patch(
  //   "/exercises/:id",
  //   { schema: createExerciseSchema, onRequest: [fastify.auth] },
  //   async (request, reply) => {
  //     const { id } = request.params;
  //     const { name, bodyPart, category } = request.body;

  //     if (!isGoodBodyPart(bodyPart)) {
  //       return reply
  //         .status(StatusCodes.CONFLICT)
  //         .send({ error: "Nem jó testrész van megadva!" });
  //     }

  //     if (!isGoodCategory(category)) {
  //       return reply
  //         .status(StatusCodes.CONFLICT)
  //         .send({ error: "Nem jó kateógria!" });
  //     }

  //     const exercise = await Exercise.findByPk(id);

  //     await exercise.update({ name, bodyPart, category });
  //     reply.send({ message: "Exercise updated!" });
  //   }
  // );

  // add an exercise to a workout
  fastify.post(
    "/exercises/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId, workoutId } = request.params;

      const exercise = await Exercise.findByPk(exerciseId);
      const workout = await Workout.findByPk(workoutId);

      await workout.addExercise(exercise);
      reply.send({
        message: `Exercise added to workout with an id of ${workoutId}!`,
      });
    }
  );

  // remove an exercise from workout
  fastify.delete(
    "/remove-exercise-from-workout/:exerciseId/:workoutId",
    async (request, reply) => {
      const { exerciseId, workoutId } = request.params;
      const workout = await Workout.findByPk(workoutId);
      const exercise = await Exercise.findByPk(exerciseId);

      await workout.removeExercise(exercise);

      return reply.send({
        message: "Exercise removed from workout successfully.",
      });
    }
  );
};
