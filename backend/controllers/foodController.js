const { StatusCodes } = require("http-status-codes");
const { Meal, Food, MealFood } = require("../models/index");
const { calcNutrients } = require("../utils/helper");
const { DATA_NOT_FOUND_ERROR, ALL_REQUIRED_ERROR } = require("../utils/error");
const {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
  REMOVED_MESSAGE,
} = require("../utils/data");
const {
  errorReply,
  createdReply,
  updatedReply,
  removedReply,
} = require("../utils/reply");

const handleGetAllFood = async (request, reply) => {
  const food = await Food.findAll({ order: [["name", "ASC"]] });
  if (!food) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  reply.send(food);
};

const handleGetFoodInMeal = async (request, reply) => {
  const { mealId } = request.params;
  const meal = await Meal.findByPk(mealId, {
    include: {
      model: Food,
    },
  });

  if (!meal || !meal.Food) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  reply.send(meal.Food);
};

const handleGetFoodQuantity = async (request, reply) => {
  const { foodId, mealId } = request.params;
  const mealFood = await MealFood.findAll({ where: { foodId, mealId } });
  if (!mealFood) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  reply.send(mealFood);
};

const handleAddFoodToMeal = async (request, reply) => {
  const { foodId, mealId } = request.params;
  const { quantityInGrams } = request.body;
  const food = await Food.findByPk(foodId);
  const meal = await Meal.findByPk(mealId);

  if (!meal || !food) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  if (!quantityInGrams) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  await MealFood.create({
    foodId,
    mealId,
    quantityInGrams,
  });

  const macros = calcNutrients(food, quantityInGrams);
  await meal.update({
    calories: meal.calories + macros.calories,
    protein: meal.protein + macros.protein,
    carbs: meal.carbs + macros.carbs,
    fats: meal.fats + macros.fats,
  });

  reply.send({
    message: "Added food to meal successfully!",
  });
};

const handleCreateFood = async (request, reply) => {
  const { name, caloriesPer100g, proteinPer100g, carbsPer100g, fatsPer100g } =
    request.body;

  if (
    !name ||
    !caloriesPer100g ||
    !proteinPer100g ||
    !carbsPer100g ||
    !fatsPer100g
  ) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  await Food.create({
    name,
    caloriesPer100g,
    proteinPer100g,
    carbsPer100g,
    fatsPer100g,
  });

  createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleUpdateFoodQuantity = async (request, reply) => {
  const { foodId, mealId } = request.params;
  const { quantityInGrams } = request.body;
  const food = await Food.findByPk(foodId);
  const meal = await Meal.findByPk(mealId);
  const mealFood = await MealFood.findAll({ where: { foodId, mealId } });

  if (!food || !meal || !mealFood) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  const oldMacros = calcNutrients(food, mealFood[0].quantityInGrams);
  const newMacros = calcNutrients(food, quantityInGrams);

  const diff = {
    calories: newMacros.calories - oldMacros.calories,
    protein: newMacros.protein - oldMacros.protein,
    carbs: newMacros.carbs - oldMacros.carbs,
    fats: newMacros.fats - oldMacros.fats,
  };

  await meal.update({
    calories: meal.calories + diff.calories,
    protein: meal.protein + diff.protein,
    carbs: meal.carbs + diff.carbs,
    fats: meal.fats + diff.fats,
  });

  await mealFood[0].update({ quantityInGrams });

  updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleRemoveFoodFromMeal = async (request, reply) => {
  const { foodId, mealId } = request.params;
  const food = await Food.findByPk(foodId);
  const meal = await Meal.findByPk(mealId);
  const mealFood = await MealFood.findAll({ where: { foodId, mealId } });

  if (!food || !meal || !mealFood) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  const macros = calcNutrients(food, mealFood[0].quantityInGrams);
  await meal.update({
    calories: meal.calories - macros.calories,
    protein: meal.protein - macros.protein,
    carbs: meal.carbs - macros.carbs,
    fats: meal.fats - macros.fats,
  });

  await meal.removeFood(food);

  removedReply(reply, StatusCodes.OK, REMOVED_MESSAGE);
};

module.exports = {
  handleGetFoodQuantity,
  handleGetAllFood,
  handleGetFoodInMeal,
  handleAddFoodToMeal,
  handleCreateFood,
  handleUpdateFoodQuantity,
  handleRemoveFoodFromMeal,
};
