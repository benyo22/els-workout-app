const { Sleep, User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { createSleepSchema } = require("../utils/fastify.schemas");
const { USER_NOT_FOUND_ERROR, ALL_REQUIRED_ERROR } = require("../utils/data");

module.exports = async (fastify, options) => {
  // get all sleep data
  fastify.get(
    "/sleep/:userId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      const sleepData = await Sleep.findAll({ where: { userId } });

      return reply.send(sleepData);
    }
  );

  // create sleep data
  fastify.post(
    "/sleep/:userId",
    { schema: createSleepSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const { date, durationSec, quality } = request.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      if (!date || !durationSec || !quality) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      await Sleep.create({
        userId,
        date,
        durationSec,
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
      const { date, durationSec, quality } = request.body;

      if (!date || !durationSec || !quality) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      const sleep = await Sleep.findByPk(sleepId);
      await sleep.update({ date, durationSec, quality });

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
