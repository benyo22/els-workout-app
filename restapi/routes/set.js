const { StatusCodes } = require("http-status-codes");
const { Set, Exercise } = require("../models");
const { isGoodSetType } = require("../utils/helper");
const { createSetSchema } = require("../utils/fastify.schemas");

async function setRoutes(fastify, options) {
  // get all sets for an exercise
  fastify.get(
    "/sets/:exerciseId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId } = request.params;

      const exercise = await Exercise.findByPk(exerciseId, {
        include: {
          model: Set,
        },
      });

      reply.send(exercise.Sets);
    }
  );

  // add a new set to an exercise
  fastify.post(
    "/sets/:exerciseId/:userId",
    { schema: createSetSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId, userId } = request.params;
      const { setNumber, reps, duration, weight, type } = request.body;

      if (!isGoodSetType(type)) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Nem jó szett típus!" });
      }

      await Set.create({
        userId,
        exerciseId,
        setNumber,
        reps,
        duration,
        weight,
        type,
      });

      reply.status(StatusCodes.CREATED);
    }
  );

  // update a set
  fastify.patch(
    "/sets/:setId",
    { schema: createSetSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { setId } = request.params;
      const { setNumber, reps, duration, weight, type } = request.body;

      if (!isGoodSetType) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Nem jó szett típus!" });
      }

      const set = await Set.findByPk(setId);
      await set.update({ setNumber, reps, duration, weight, type });

      reply.send({ message: "Set updated!" });
    }
  );

  // delete a set
  fastify.delete(
    "/sets/:setId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { setId } = request.params;

      await Set.destroy({ where: { id: setId } });

      reply.send({ message: "Set deleted!" });
    }
  );
}

module.exports = setRoutes;
