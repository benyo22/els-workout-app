const { StatusCodes } = require("http-status-codes");
const { User, Weight } = require("../models");
const { where } = require("sequelize");
const { createSleepSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all weight data
  fastify.get(
    "/weight/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const weightData = await Weight.findAll({ where: { userId } });

      reply.send(weightData);
    }
  );

  // add weight data
  fastify.post(
    "/weight/:id",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const { weight, date } = request.body;

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
  fastify.patch(
    "/weight/:id",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const { weight, date } = request.body;

      const weightData = await Weight.findByPk(id);
      await weightData.update({ weight, date });

      return reply.send({ message: "Weight updated!" });
    }
  );

  //delete weight data
  fastify.delete(
    "/weight/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      await Weight.destroy({ where: { id } });

      reply.send({
        message: `Deleted a weight with an id of ${id}!`,
      });
    }
  );
};
