const {
  handleGetAllMeals,
  handleGetMealsByDate,
  handleCreateMeal,
  handleDeleteMeal,
} = require("../controllers/mealController");
const { User, Meal } = require("../models");
const { CREATED_MESSAGE, DELETED_MESSAGE } = require("../utils/data");
const { createdReply, deletedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/reply");

describe("mealController test", () => {
  let request, reply;

  beforeEach(() => {
    request = {
      params: { userId: 1, date: "2025-04-29", mealId: 10 },
      body: {
        calories: 0,
        carbs: 0,
        date: "2025-04-29",
        fats: 0,
        protein: 0,
        type: "breakfast",
        userId: 1,
      },
    };
    reply = { send: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all meals", async () => {
    const meals = { data: "asdasd" };
    User.findByPk.mockResolvedValue({ id: 1 });
    Meal.findAll.mockResolvedValue(meals);

    await handleGetAllMeals(request, reply);

    expect(reply.send).toHaveBeenCalledWith(meals);
  });

  it("should return meals by date", async () => {
    const meals = { data: "asdasd" };
    User.findByPk.mockResolvedValue({ id: 1 });
    Meal.findAll.mockResolvedValue(meals);

    await handleGetMealsByDate(request, reply);

    expect(reply.send).toHaveBeenCalledWith(meals);
  });

  it("should create a new meal", async () => {
    User.findByPk.mockResolvedValue({ id: 1 });
    Meal.create.mockResolvedValue({});

    await handleCreateMeal(request, reply);

    expect(Meal.create).toHaveBeenCalledWith({
      calories: 0,
      carbs: 0,
      date: "2025-04-29",
      fats: 0,
      protein: 0,
      type: "breakfast",
      userId: 1,
    });
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should delete a meal", async () => {
    const mockMeal = { destroy: jest.fn() };
    Meal.findByPk.mockResolvedValue(mockMeal);

    await handleDeleteMeal(request, reply);

    expect(mockMeal.destroy).toHaveBeenCalled();
    expect(deletedReply).toHaveBeenCalledWith(reply, 200, DELETED_MESSAGE);
  });
});
