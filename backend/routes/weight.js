const { Weight, User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { createWeightSchema } = require("../utils/fastify.schemas");
const { USER_NOT_FOUND_ERROR, ALL_REQUIRED_ERROR } = require("../utils/data");

module.exports = async (fastify, options) => {
  // get all weight data
  fastify.get(
    "/weight/:userId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      const weightData = await Weight.findAll({ where: { userId } });

      reply.send(weightData);
    }
  );

  // create weight data
  fastify.post(
    "/weight/:userId",
    { schema: createWeightSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const { date, weight } = request.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      if (!weight || !date) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      await Weight.create({
        userId,
        weight,
        date,
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Weight created!" });
    }
  );

  // update weight data
  fastify.put(
    "/weight/:weightId",
    { schema: createWeightSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { weightId } = request.params;
      const { date, weight } = request.body;

      if (!weight || !date) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      const weightData = await Weight.findByPk(weightId);
      await weightData.update({ weight, date });

      return reply.send({ message: "Weight updated!" });
    }
  );

  //delete weight data
  fastify.delete(
    "/weight/:weightId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { weightId } = request.params;
      await Weight.destroy({ where: { id: weightId } });

      reply.send({
        message: `Deleted a weight with an id of ${weightId}!`,
      });
    }
  );
};
