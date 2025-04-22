const { StatusCodes } = require("http-status-codes");
const { Meal, Food, MealFood } = require("../models");
const { createMealSchema } = require("../utils/fastify.schemas");
const { MAX_INT, ALL_REQUIRED_ERROR } = require("../utils/data");
const { calcNutrients } = require("../utils/helper");

module.exports = async (fastify, options) => {
  // get food quantity
  fastify.get(
    "/food-quantity/:foodId/:mealId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { foodId, mealId } = request.params;
      const mealFood = await MealFood.findAll({ where: { foodId, mealId } });
      if (!mealFood) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Nem létezik!" });
      }

      reply.send(mealFood);
    }
  );

  //get all food data
  fastify.get(
    "/food",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const foodData = await Food.findAll();

      reply.send(foodData);
    }
  );

  // get all food in a meal by mealId
  fastify.get(
    "/meal-food/:mealId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { mealId } = request.params;

      const meal = await Meal.findByPk(mealId, {
        include: {
          model: Food,
        },
      });

      reply.send(meal.Food);
    }
  );

  // add food to a meal
  fastify.post(
    "/food/:foodId/:mealId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { foodId, mealId } = request.params;
      const quantityInGrams = request.body;
      const food = await Food.findByPk(foodId);
      const mealData = await Meal.findByPk(mealId);

      if (!mealData || !food) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Étkezés vagy étel nem található!" });
      }

      if (!quantityInGrams) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      if (quantityInGrams > MAX_INT) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Túl nagy szám!" });
      }

      await MealFood.create({
        foodId,
        mealId,
        quantityInGrams,
      });

      const macros = calcNutrients(food, quantityInGrams);
      await mealData.update({
        calories: mealData.calories + macros.calories,
        protein: mealData.protein + macros.protein,
        carbs: mealData.carbs + macros.carbs,
        fats: mealData.fats + macros.fats,
      });

      reply.send({
        message: `Food with an id of ${foodId} has been added to meal with an id of ${mealId}!`,
      });
    }
  );

  // create food
  fastify.post(
    "/food",
    { schema: createMealSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const {
        name,
        caloriesPer100g,
        proteinPer100g,
        carbsPer100g,
        fatsPer100g,
      } = request.body;

      if (
        !name ||
        !caloriesPer100g ||
        !proteinPer100g ||
        !carbsPer100g ||
        !fatsPer100g
      ) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      if (
        caloriesPer100g > MAX_INT ||
        proteinPer100g > MAX_INT ||
        carbsPer100g > MAX_INT ||
        fatsPer100g > MAX_INT
      ) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Túl nagy szám!" });
      }

      await Food.create({
        name,
        caloriesPer100g,
        proteinPer100g,
        carbsPer100g,
        fatsPer100g,
      });

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Food created!" });
    }
  );

  // edit quantity
  fastify.patch(
    "/food/:foodId/:mealId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { foodId, mealId } = request.params;
      const quantityInGrams = request.body;
      const food = await Food.findByPk(foodId);
      const meal = await Meal.findByPk(mealId);
      const mealFood = await MealFood.findAll({ where: { foodId, mealId } });

      if (!mealFood || !food || !meal) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Nem létezik!" });
      }

      if (quantityInGrams > MAX_INT) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Túl nagy szám!" });
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

      reply.send({ message: "Quantity has been edited!" });
    }
  );

  // remove food from meal
  fastify.delete(
    "/remove-food-from-meal/:foodId/:mealId",
    async (request, reply) => {
      const { foodId, mealId } = request.params;
      const food = await Food.findByPk(foodId);
      const meal = await Meal.findByPk(mealId);
      const mealFood = await MealFood.findAll({ where: { foodId, mealId } });

      const macros = calcNutrients(food, mealFood[0].quantityInGrams);
      await meal.update({
        calories: meal.calories - macros.calories,
        protein: meal.protein - macros.protein,
        carbs: meal.carbs - macros.carbs,
        fats: meal.fats - macros.fats,
      });

      await meal.removeFood(food);

      return reply.send({
        message: "Food removed from meal successfully.",
      });
    }
  );
};
