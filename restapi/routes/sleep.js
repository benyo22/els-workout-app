const { StatusCodes } = require("http-status-codes");
const { User, Sleep } = require("../models");
const { where } = require("sequelize");
const { addSleepSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all sleep data
  fastify.get(
    "/sleep",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const userId = request.user.id;
      const sleepData = await Sleep.findAll({ userId });

      reply.send(sleepData);
    }
  );

  // add sleep data
  fastify.post(
    "/sleep",
    { schema: addSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const userId = request.user.id;
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
    { schema: addSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { id } = request.params;
      const { date, durationHour, quality } = request.body;

      const sleep = await Sleep.findByPk(id);
      sleep.date = date;
      sleep.durationHour = durationHour;
      sleep.quality = quality;

      await sleep.save();

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
