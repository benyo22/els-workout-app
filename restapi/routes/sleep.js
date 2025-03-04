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

      if (!date || !durationHour || !quality)
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "A *-al jelölt mezők kitöltése kötelező" });

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
