const { StatusCodes } = require("http-status-codes");
const { User, Meal } = require("../models/index");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { isGoodMealType } = require("../utils/helper");
const { errorReply, createdReply, deletedReply } = require("../utils/reply");
const { CREATED_MESSAGE, DELETED_MESSAGE } = require("../utils/data");

const handleGetAllMeals = async (request, reply) => {
  const { userId } = request.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  const mealData = await Meal.findAll({
    where: {
      userId,
    },
  });

  if (!mealData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  return reply.send(mealData);
};

const handleGetMealsByDate = async (request, reply) => {
  const { userId, date } = request.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  const mealData = await Meal.findAll({
    where: {
      userId,
      date,
    },
  });

  if (!mealData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  return reply.send(mealData);
};

const handleCreateMeal = async (request, reply) => {
  const { userId } = request.params;
  const { type, date } = request.body;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  if (!type || !date) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  if (!isGoodMealType) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, NOT_VALID_DATA_ERROR);
  }

  await Meal.create({
    userId,
    type,
    date: date,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  return createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleDeleteMeal = async (request, reply) => {
  const { mealId } = request.params;
  const meal = await Meal.findByPk(mealId);
  if (!meal) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  await meal.destroy();

  return deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleGetAllMeals,
  handleGetMealsByDate,
  handleCreateMeal,
  handleDeleteMeal,
};
