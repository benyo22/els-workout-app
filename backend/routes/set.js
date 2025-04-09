const { StatusCodes } = require("http-status-codes");
const { Set, Exercise } = require("../models");
const { isGoodSetType } = require("../utils/helper");
const {
  createSetSchema,
  bulkUpdateSetSchema,
} = require("../utils/fastify.schemas");
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

      const exercise = await Exercise.findByPk(exerciseId);
      const workout = await Exercise.findByPk(workoutId);

      if (!exercise) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Gyakorlat nem létezik!" });
      }

      if (!workout) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Edzés nem létezik!" });
      }

      const set = await Set.create({
        exerciseId,
        workoutId,
        setNumber: null,
        reps: null,
        weight: null,
        durationSec: null,
        distanceMeter: null,
      });

      reply.status(StatusCodes.CREATED).send(set);
    }
  );

  // update a set
  fastify.patch(
    "/sets/:setId",
    { schema: createSetSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { setId } = request.params;
      const { setNumber, reps, weight, durationSec, distanceMeter, type } =
        request.body;

      if (type && !isGoodSetType) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Nem jó szett típus!" });
      }

      const set = await Set.findByPk(setId);
      if (!set) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Szett nem létezik!" });
      }
      await set.update({
        setNumber,
        reps,
        weight,
        durationSec,
        distanceMeter,
        type,
      });

      reply.send({ message: "Set updated!" });
    }
  );

  // bulk update sets
  fastify.patch(
    "/sets",
    { schema: bulkUpdateSetSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const sets = request.body;

      for (const set of sets) {
        if (set.type && !isGoodSetType(set.type)) {
          return reply.status(StatusCodes.CONFLICT).send({
            error: `Nem jó szett típus ${set.id}!`,
          });
        }
      }

      for (let i = 0; i < sets.length; i++) {
        await Promise.all(
          sets.map((set) =>
            Set.update(
              {
                setNumber: set.setNumber,
                reps: set.reps,
                weight: set.weight,
                durationSec: set.durationSec,
                distanceMeter: set.distanceMeter,
                type: set.type,
              },
              { where: { id: set.id } }
            )
          )
        );
      }

      reply.status(StatusCodes.OK);
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
