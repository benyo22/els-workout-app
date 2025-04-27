const { StatusCodes } = require("http-status-codes");
const { Workout, Exercise, Set } = require("../models/index");
const { isGoodSetType } = require("../utils/helper");
const { UPDATED_MESSAGE, DELETED_MESSAGE } = require("../utils/data");
const {
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { errorReply, updatedReply, deletedReply } = require("../utils/reply");

const handleGetSetsInExercise = async (request, reply) => {
  const { exerciseId, workoutId } = request.params;
  const sets = await Set.findAll({ where: { exerciseId, workoutId } });

  if (!sets) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  reply.send(sets);
};

const handleAddSetToExercise = async (request, reply) => {
  const { exerciseId, workoutId } = request.params;
  const exercise = await Exercise.findByPk(exerciseId);
  const workout = await Workout.findByPk(workoutId);

  if (!exercise || !workout) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
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
};

const handleUpdateSet = async (request, reply) => {
  const { setId } = request.params;
  const { setNumber, reps, weight, durationSec, distanceMeter, type } =
    request.body;

  if (type && !isGoodSetType) {
    return errorReply(reply, StatusCodes.CONFLICT, NOT_VALID_DATA_ERROR);
  }

  const set = await Set.findByPk(setId);
  if (!set) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await set.update({
    setNumber,
    reps,
    weight,
    durationSec,
    distanceMeter,
    type,
  });

  updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleBulkUpdateSets = async (request, reply) => {
  const sets = request.body;

  for (const set of sets) {
    if (set.type && !isGoodSetType(set.type)) {
      return errorReply(reply, StatusCodes.CONFLICT, NOT_VALID_DATA_ERROR);
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
};

const handleDeleteSet = async (request, reply) => {
  const { setId } = request.params;
  const set = await Set.findByPk(setId);
  if (!set) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  await set.destroy();

  deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

const handleDeleteAllSetsInExercise = async (request, reply) => {
  const { exerciseId, workoutId } = request.params;
  const sets = await Set.findAll({ where: { exerciseId, workoutId } });
  if (!sets) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  for (let i = 0; i < sets.length; i++) {
    await Set.destroy({ where: { id: sets[i].id } });
  }

  deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleGetSetsInExercise,
  handleAddSetToExercise,
  handleUpdateSet,
  handleBulkUpdateSets,
  handleDeleteSet,
  handleDeleteAllSetsInExercise,
};
