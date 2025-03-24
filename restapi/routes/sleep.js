const { StatusCodes } = require("http-status-codes");
const { Sleep } = require("../models");
const { createSleepSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  // get all sleep data
  fastify.get(
    "/sleep/:userId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const sleepData = await Sleep.findAll({ where: { userId } });

      reply.send(sleepData);
    }
  );

  // create sleep data
  fastify.post(
    "/sleep/:userId",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const { date, durationHour, quality } = request.body;

      if (!date || !durationHour || !quality) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Minden mezőt ki kell tölteni!" });
      }

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

  // update sleep data
  fastify.put(
    "/sleep/:sleepId",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { sleepId } = request.params;
      const { date, durationHour, quality } = request.body;

      if (!date || !durationHour || !quality) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Minden mezőt ki kell tölteni!" });
      }

      const sleep = await Sleep.findByPk(sleepId);
      await sleep.update({ date, durationHour, quality });

      return reply.send({ message: `Sleep updated with an id of ${sleepId}!` });
    }
  );

  //delete sleep data
  fastify.delete(
    "/sleep/:sleepId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { sleepId } = request.params;
      await Sleep.destroy({ where: { id: sleepId } });

      reply.send({
        message: `Deleted a sleep with an id of ${sleepId}!`,
      });
    }
  );
};
