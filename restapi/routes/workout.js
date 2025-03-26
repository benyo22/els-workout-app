const { StatusCodes } = require("http-status-codes");
const { Workout, Exercise, Set } = require("../models");
const { where } = require("sequelize");
const { createWorkoutSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all workout data
  fastify.get(
    "/workout/:userId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const workoutData = await Workout.findAll({ where: { userId } });

      reply.send(workoutData);
    }
  );

  // create workout
  fastify.post(
    "/workout/:userId",
    { schema: createWorkoutSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const { name, date } = request.body;

      if (!name || !date) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Minden mezőt ki kell tölteni!" });
      }

      if (name.length > 30) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Az edzés neve maximum 30 hosszú lehet!" });
      }

      await Workout.create({
        userId,
        name,
        date: new Date(date),
        isCompleted: false,
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Workout created!" });
    }
  );

  // finish workout
  fastify.patch(
    "/workout-close/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { workoutId } = request.params;
      const workout = await Workout.findByPk(workoutId, {
        include: {
          model: Exercise,
          through: { attributes: [] }, // exclude pivot table attributes
        },
      });

      workout.isCompleted = true;
      await workout.save();

      const exercises = workout.Exercises;

      // remove empty sets
      for (const exercise of exercises) {
        const sets = await Set.findAll({
          where: { exerciseId: exercise.id, workoutId },
        });

        for (const set of sets) {
          if (
            (set.reps === 0 || set.weight === 0) &&
            set.duration === 0 &&
            set.distance === 0
          ) {
            await Set.destroy({
              where: { id: set.id },
            });
          }
        }
      }

      // remove empty exercises
      for (const exercise of exercises) {
        const sets = await Set.findAll({
          where: { exerciseId: exercise.id, workoutId },
        });

        if (sets.length === 0) {
          await workout.removeExercise(exercise);
        }
      }

      return reply.send({ message: "Workout closed!" });
    }
  );

  // edit workout
  fastify.patch(
    "/workout-edit/:workoutId",
    { schema: createWorkoutSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { workoutId } = request.params;
      const { name, date } = request.body;
      const workoutData = await Workout.findByPk(workoutId);

      await workoutData.update({
        name,
        date: new Date(date),
      });

      return reply.send({ message: "Workout updated!" });
    }
  );

  // delete workout
  fastify.delete(
    "/workout/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { workoutId } = request.params;
      const workout = await Workout.findByPk(workoutId, {
        include: {
          model: Exercise,
          through: { attributes: [] }, // exclude pivot table attributes
        },
      });

      // remove empty sets
      const exercises = workout.Exercises;
      for (const exercise of exercises) {
        const sets = await Set.findAll({
          where: { exerciseId: exercise.id, workoutId },
        });

        for (const set of sets) {
          await Set.destroy({
            where: { id: set.id },
          });
        }
      }
      await Workout.destroy({ where: { id: workoutId } });

      reply.send({
        message: `Deleted a workout with an id of ${workoutId}!`,
      });
    }
  );
};
