const { StatusCodes } = require("http-status-codes");
const { Set, Exercise } = require("../models");
const { isGoodSetType } = require("../utils/helper");
const { createSetSchema } = require("../utils/fastify.schemas");
const { where } = require("sequelize");

module.exports = async (fastify, options) => {
  // get all sets for an exercise
  fastify.get(
    "/sets/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId, workoutId } = request.params;

      const sets = await Set.findAll({ where: { exerciseId, workoutId } });

      reply.send(sets);
    }
  );

  // add a new set to an exercise
  fastify.post(
    "/sets/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId, workoutId } = request.params;

      await Set.create({
        exerciseId,
        workoutId,
        setNumber: null,
        reps: null,
        weight: null,
        duration: null,
        distance: null,
        type: null,
      });

      reply.status(StatusCodes.CREATED).send({ message: "Set created!" });
    }
  );

  // update a set
  fastify.patch(
    "/sets/:setId",
    { schema: createSetSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { setId } = request.params;
      const { setNumber, reps, weight, duration, distance, type } =
        request.body;

      if (type && !isGoodSetType) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Nem jó szett típus!" });
      }

      const set = await Set.findByPk(setId);
      await set.update({ setNumber, reps, weight, duration, distance, type });

      reply.send({ message: "Set updated!" });
    }
  );

  // delete one set
  fastify.delete(
    "/sets/:setId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { setId } = request.params;

      await Set.destroy({ where: { id: setId } });

      reply.send({ message: "Set deleted!" });
    }
  );

  // delete all sets in exercise
  fastify.delete(
    "/sets-delete-all/:exerciseId/:workoutId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { exerciseId, workoutId } = request.params;

      const sets = await Set.findAll({ where: { exerciseId, workoutId } });
      for (let i = 0; i < sets.length; i++) {
        await Set.destroy({ where: { id: sets[i].id } });
      }

      reply.send({ message: "Sets in exercise deleted!" });
    }
  );
};
