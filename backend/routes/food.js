const { StatusCodes } = require("http-status-codes");
const { Meal, Food, MealFood } = require("../models");
const { createMealSchema } = require("../utils/fastify.schemas");
const { MAX_INT, ALL_REQUIRED_ERROR } = require("../utils/data");

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

      const mealFood = await MealFood.findAll({ where: { foodId, mealId } });
      if (!mealFood) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Nem létezik!" });
      }

      if (quantityInGrams > MAX_INT) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Túl nagy szám!" });
      }

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

      await meal.removeFood(food);

      return reply.send({
        message: "Food removed from meal successfully.",
      });
    }
  );
};
