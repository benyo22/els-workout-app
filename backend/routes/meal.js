const { createMealSchema } = require("../schemas/mealSchemas");
const {
  handleGetMealsByDate,
  handleGetAllMeals,
  handleCreateMeal,
  handleDeleteMeal,
} = require("../controllers/mealController");

module.exports = async (fastify, options) => {
  fastify.get(
    "/meal/:userId",
    { onRequest: [fastify.auth] },
    handleGetAllMeals
  );
  fastify.get(
    "/meal-by-date/:userId/:date",
    { onRequest: [fastify.auth] },
    handleGetMealsByDate
  );
  fastify.post(
    "/meal/:userId",
    { schema: createMealSchema, onRequest: [fastify.auth] },
    handleCreateMeal
  );
  fastify.delete(
    "/meal/:mealId",
    { onRequest: [fastify.auth] },
    handleDeleteMeal
  );
};
