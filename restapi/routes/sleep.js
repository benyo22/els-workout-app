const { StatusCodes } = require("http-status-codes");
const { Sleep } = require("../models");
const { where } = require("sequelize");
const { createSleepSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all sleep data
  fastify.get(
    "/sleep/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const sleepData = await Sleep.findAll({ where: { userId } });

      reply.send(sleepData);
    }
  );

  // add sleep data
  fastify.post(
    "/sleep/:id",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id: userId } = request.params;
      const { date, durationHour, quality } = request.body;

      await Sleep.create({
        userId,
        date,
        durationHour,
        quality,
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Sleep created!" });
    }
  );

  // edit sleep data
  fastify.patch(
    "/sleep/:id",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const { date, durationHour, quality } = request.body;

      const sleep = await Sleep.findByPk(id);
      await sleep.update({ date, durationHour, quality });

      return reply.send({ message: "Sleep updated!" });
    }
  );

  //delete sleep data
  fastify.delete(
    "/sleep/:id",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      await Sleep.destroy({ where: { id } });

      reply.send({
        message: `Deleted a sleep with an id of ${id}!`,
      });
    }
  );
};
