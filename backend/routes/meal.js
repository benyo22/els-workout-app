const {
  USER_NOT_FOUND_ERROR,
  ALL_REQUIRED_ERROR,
  isGoodMealType,
  calcNutrients,
} = require("../utils/helper");
const { StatusCodes } = require("http-status-codes");
const { Meal, Food, MealFood, User } = require("../models");
const { createMealSchema } = require("../utils/fastify.schemas");

module.exports = async (fastify, options) => {
  //get all meal data
  fastify.get(
    "/meal/:userId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      const mealData = await Meal.findAll({
        where: {
          userId,
        },
      });

      reply.send(mealData);
    }
  );

  //get all meal data by date
  fastify.get(
    "/meal/:userId/:date",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId, date } = request.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      const mealData = await Meal.findAll({
        where: {
          userId,
          date,
        },
      });

      reply.send(mealData);
    }
  );

  //get all maros in a days meals by date
  fastify.get(
    "/meal-macros/:userId/:date",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId, date } = request.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      const mealData = await Meal.findAll({
        where: {
          userId,
          date,
        },
      });

      const mealFood = await MealFood.findAll();

      const mealsOnDate = mealFood.filter((mealFoodItem) =>
        mealData.some((meal) => meal.id === mealFoodItem.mealId)
      );

      let macros = { calories: 0, protein: 0, carbs: 0, fats: 0 };
      for (let i = 0; i < mealsOnDate.length; i++) {
        const food = await Food.findByPk(mealsOnDate[i].foodId);

        const { calories, protein, carbs, fats } = calcNutrients(
          food,
          mealsOnDate[i].quantityInGrams
        );
        macros.calories += calories;
        macros.protein += protein;
        macros.carbs += carbs;
        macros.fats += fats;
      }

      reply.send(macros);
    }
  );

  // create meal
  fastify.post(
    "/meal/:userId",
    { schema: createMealSchema, onRequest: [fastify.auth] },
    async (request, reply) => {
      const { userId } = request.params;
      const { type, date } = request.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: USER_NOT_FOUND_ERROR });
      }

      if (!type || !date) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: ALL_REQUIRED_ERROR });
      }

      if (!isGoodMealType) {
        return reply
          .status(StatusCodes.CONFLICT)
          .send({ error: "Nem jó étkezés típus!" });
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

      return reply
        .status(StatusCodes.CREATED)
        .send({ message: "Meal created!" });
    }
  );

  // delete meal
  fastify.delete(
    "/meal/:mealId",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const { mealId } = request.params;

      const meal = await Meal.findByPk(mealId);
      if (!meal) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Étkezés nem található!" });
      }

      await meal.destroy();

      reply.send({
        message: `Deleted a meal with an id of ${mealId}!`,
      });
    }
  );
};
