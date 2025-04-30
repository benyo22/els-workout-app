const { StatusCodes } = require("http-status-codes");
const { Exercise, Workout } = require("../models");
const {
  ALL_REQUIRED_ERROR,
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { errorReply, createdReply, removedReply } = require("../utils/reply");
const { CREATED_MESSAGE, REMOVED_MESSAGE } = require("../utils/data");
const { isGoodCategory, isGoodBodyPart } = require("../utils/helper");

const handleGetAllExercises = async (request, reply) => {
  const exercises = await Exercise.findAll({ order: [["name", "ASC"]] });
  if (!exercises) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  reply.send(exercises);
};

const handleGetExercisesInWorkout = async (request, reply) => {
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

  reply.send(workout.Exercises);
};

const handleCreateExercise = async (request, reply) => {
  const { name, bodyPart, category } = request.body;

  if (!name) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  if (!isGoodBodyPart(bodyPart)) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, NOT_VALID_DATA_ERROR);
  }

  if (!isGoodCategory(category)) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, NOT_VALID_DATA_ERROR);
  }

  await Exercise.create({
    name,
    bodyPart,
    category,
  });

  createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleAddExerciseToWorkout = async (request, reply) => {
  const { exerciseId, workoutId } = request.params;
  const exercise = await Exercise.findByPk(exerciseId);
  const workout = await Workout.findByPk(workoutId);

  if (!exercise || !workout) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  await workout.addExercise(exercise);
  reply.send({
    message: "Added exercise to workout successfully",
  });
};

const handleRemoveExerciseFromWorkout = async (request, reply) => {
  const { exerciseId, workoutId } = request.params;
  const exercise = await Exercise.findByPk(exerciseId);
  const workout = await Workout.findByPk(workoutId);

  if (!exercise || !workout) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  await workout.removeExercise(exercise);

  removedReply(reply, StatusCodes.OK, REMOVED_MESSAGE);
};

module.exports = {
  handleAddExerciseToWorkout,
  handleCreateExercise,
  handleGetAllExercises,
  handleGetExercisesInWorkout,
  handleRemoveExerciseFromWorkout,
};
