const {
  createFoodSchema,
  foodQuantitySchema,
} = require("../schemas/foodSchemas");
const {
  handleGetAllFood,
  handleGetFoodInMeal,
  handleAddFoodToMeal,
  handleCreateFood,
  handleUpdateFoodQuantity,
  handleRemoveFoodFromMeal,
  handleGetFoodQuantity,
} = require("../controllers/foodController");

module.exports = async (fastify, options) => {
  fastify.get("/food", { onRequest: [fastify.auth] }, handleGetAllFood);
  fastify.get(
    "/food-in-meal/:mealId",
    { onRequest: [fastify.auth] },
    handleGetFoodInMeal
  );
  fastify.get(
    "/food-quantity/:foodId/:mealId",
    { onRequest: [fastify.auth] },
    handleGetFoodQuantity
  );
  fastify.post(
    "/add-food-to-meal/:foodId/:mealId",
    { schema: foodQuantitySchema, onRequest: [fastify.auth] },
    handleAddFoodToMeal
  );
  fastify.post(
    "/food",
    { schema: createFoodSchema, onRequest: [fastify.auth] },
    handleCreateFood
  );
  fastify.patch(
    "/food/:foodId/:mealId",
    { onRequest: [fastify.auth] },
    handleUpdateFoodQuantity
  );
  fastify.delete(
    "/remove-food-from-meal/:foodId/:mealId",
    handleRemoveFoodFromMeal
  );
};
