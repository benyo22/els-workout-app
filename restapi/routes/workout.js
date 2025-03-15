const { StatusCodes } = require("http-status-codes");
const { User, Workout } = require("../models");
const { where } = require("sequelize");
const {
  addWorkoutSchema,
  closeWorkoutSchema,
} = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all workout data
  fastify.get(
    "/workout/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const workoutData = await Workout.findAll({ where: { userId } });

      reply.send(workoutData);
    }
  );

  // add workout
  fastify.post(
    "/workout/:id",
    { schema: addWorkoutSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const { name, date } = request.body;

      await Workout.create({
        userId,
        name,
        date,
        isCompleted: false,
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Workout created!" });
    }
  );

  // close workout
  fastify.patch(
    "/workout/:id",
    { schema: closeWorkoutSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const workoutData = await Workout.findByPk(id);

      workoutData.isCompleted = true;

      await workoutData.save();

      return reply.send({ message: "Workout closed!" });
    }
  );

  //delete workout
  fastify.delete(
    "/workout/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      await Workout.destroy({ where: { id } });

      reply.send({
        message: `Deleted a workout with an id of ${id}!`,
      });
    }
  );
};
