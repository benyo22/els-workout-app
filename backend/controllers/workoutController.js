const { StatusCodes } = require("http-status-codes");
const { User, Workout, Exercise, Set } = require("../models/index");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  DATA_NOT_FOUND_ERROR,
} = require("../utils/error");
const {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} = require("../utils/data");
const {
  errorReply,
  createdReply,
  deletedReply,
  updatedReply,
} = require("../utils/reply");

const handleGetAllWorkouts = async (request, reply) => {
  const { userId } = request.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  const workoutData = await Workout.findAll({ where: { userId } });
  if (!workoutData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  reply.send(workoutData);
};

const handleCreateWorkout = async (request, reply) => {
  const { userId } = request.params;
  const { name, date } = request.body;
  if (!name || !date) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  if (name.length > 30) {
    return reply
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Az edzés neve maximum 30 hosszú lehet!" });
  }

  await Workout.create({
    userId,
    name,
    date: date,
    isFinished: false,
  });

  createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleFinishWorkout = async (request, reply) => {
  const { workoutId } = request.params;
  const workout = await Workout.findByPk(workoutId, {
    include: {
      model: Exercise,
      through: { attributes: [] }, // exclude pivot table attributes
    },
  });
  if (!workout || !workout.Exercises) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  const exercises = workout.Exercises;
  // remove empty sets
  for (const exercise of exercises) {
    const sets = await Set.findAll({
      where: { exerciseId: exercise.id, workoutId },
    });

    for (const set of sets) {
      if (
        (!set.reps || !set.weight) &&
        !set.durationSec &&
        !set.distanceMeter
      ) {
        await Set.destroy({
          where: { id: set.id },
        });
      }
    }
  }

  // remove empty exercises
  for (const exercise of exercises) {
    const sets = await Set.findAll({
      where: { exerciseId: exercise.id, workoutId },
    });

    if (sets.length === 0) {
      await workout.removeExercise(exercise);
    }
  }

  workout.isFinished = true;
  await workout.save();

  reply.send({ message: "Workout closed!" });
};

const handleUpdateWorkout = async (request, reply) => {
  const { workoutId } = request.params;
  const { name, date } = request.body;
  const workout = await Workout.findByPk(workoutId);
  if (!workout) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  await workout.update({
    name,
    date: !date ? workout.date : new Date(date),
  });

  updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleDeletWorkout = async (request, reply) => {
  const { workoutId } = request.params;
  const workout = await Workout.findByPk(workoutId);
  if (!workout) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await workout.destroy();

  deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleGetAllWorkouts,
  handleCreateWorkout,
  handleFinishWorkout,
  handleUpdateWorkout,
  handleDeletWorkout,
};
