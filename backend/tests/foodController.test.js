const {
  handleGetAllFood,
  handleGetFoodInMeal,
  handleGetFoodQuantity,
  handleAddFoodToMeal,
  handleCreateFood,
  handleUpdateFoodQuantity,
  handleRemoveFoodFromMeal,
} = require("../controllers/foodController");
const { Food, Meal, MealFood } = require("../models");
const {
  CREATED_MESSAGE,
  REMOVED_MESSAGE,
  UPDATED_MESSAGE,
} = require("../utils/data");
const { calcNutrients } = require("../utils/helper");
const { createdReply, updatedReply, removedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/helper");
jest.mock("../utils/reply");

describe("foodController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { mealId: 1, foodId: 1 },
      body: {
        name: "Répa",
        caloriesPer100g: 10,
        proteinPer100g: 10,
        carbsPer100g: 10,
        fatsPer100g: 10,
      },
    };
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all food data", async () => {
    const foods = [{ id: 1, name: "Répa" }];
    Food.findAll.mockResolvedValue(foods);

    await handleGetAllFood(request, reply);

    expect(reply.send).toHaveBeenCalledWith(foods);
  });

  it("should return all food in a meal", async () => {
    const foods = [{ id: 1, name: "Répa" }];
    Meal.findByPk.mockResolvedValue({ Food: foods });

    await handleGetFoodInMeal(request, reply);

    expect(reply.send).toHaveBeenCalledWith(foods);
  });

  it("should return the quantity of a food item in a meal", async () => {
    const mealFood = [{ quantityInGrams: 100 }];
    MealFood.findAll.mockResolvedValue(mealFood);

    await handleGetFoodQuantity(request, reply);

    expect(reply.send).toHaveBeenCalledWith(mealFood);
  });

  it("should add food to a meal", async () => {
    const mockFood = {
      id: 1,
      name: "Répa",
    };
    const mockMeal = {
      id: 1,
      name: "Reggeli",
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
      update: jest.fn(),
    };
    request.body = { quantityInGrams: 100 };

    Food.findByPk.mockResolvedValueOnce(mockFood);
    Meal.findByPk.mockResolvedValueOnce(mockMeal);
    calcNutrients.mockReturnValue({
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
    });

    await handleAddFoodToMeal(request, reply);

    expect(MealFood.create).toHaveBeenCalledWith({
      foodId: 1,
      mealId: 1,
      quantityInGrams: request.body.quantityInGrams,
    });
    expect(mockMeal.update).toHaveBeenCalledWith({
      calories: 20,
      protein: 20,
      carbs: 20,
      fats: 20,
    });
    expect(reply.send).toHaveBeenCalledWith({
      message: "Added food to meal successfully!",
    });
  });

  it("should create food", async () => {
    await handleCreateFood(request, reply);

    expect(Food.create).toHaveBeenCalledWith(request.body);
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should update food quantity in a meal", async () => {
    const mockFood = {
      id: 1,
      name: "Répa",
      caloriesPer100g: 10,
      proteinPer100g: 10,
      carbsPer100g: 10,
      fatsPer100g: 10,
    };
    const mockMeal = {
      id: 1,
      name: "Reggeli",
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
      update: jest.fn(),
    };
    const mealFood = [{ quantityInGrams: 100, update: jest.fn() }];
    request.body = { quantityInGrams: 100 };

    Food.findByPk.mockResolvedValueOnce(mockFood);
    Meal.findByPk.mockResolvedValueOnce(mockMeal);
    MealFood.findAll.mockResolvedValueOnce(mealFood);
    calcNutrients.mockReturnValue({
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
    });

    await handleUpdateFoodQuantity(request, reply);

    expect(mealFood[0].update).toHaveBeenCalledWith({
      quantityInGrams: request.body.quantityInGrams,
    });
    expect(mockMeal.update).toHaveBeenCalledWith({
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
    });
    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should remove food from a meal", async () => {
    const mockFood = {
      id: 1,
      caloriesPer100g: 10,
      proteinPer100g: 10,
      carbsPer100g: 10,
      fatsPer100g: 10,
    };
    const mockMeal = {
      id: 1,
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
      update: jest.fn(),
      removeFood: jest.fn(),
    };
    const mealFood = [{ quantityInGrams: 100 }];

    Food.findByPk.mockResolvedValueOnce(mockFood);
    Meal.findByPk.mockResolvedValueOnce(mockMeal);
    MealFood.findAll.mockResolvedValueOnce(mealFood);
    calcNutrients.mockReturnValue({
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10,
    });

    await handleRemoveFoodFromMeal(request, reply);

    expect(mockMeal.removeFood).toHaveBeenCalledWith(mockFood);
    expect(mockMeal.update).toHaveBeenCalledWith({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    expect(removedReply).toHaveBeenCalledWith(reply, 200, REMOVED_MESSAGE);
  });
});
