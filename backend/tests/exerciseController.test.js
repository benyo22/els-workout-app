const {
  handleGetAllExercises,
  handleGetExercisesInWorkout,
  handleCreateExercise,
  handleAddExerciseToWorkout,
  handleRemoveExerciseFromWorkout,
} = require("../controllers/exerciseController");
const { Exercise, Workout } = require("../models");
const { StatusCodes } = require("http-status-codes");
const {
  ALL_REQUIRED_ERROR,
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { CREATED_MESSAGE, REMOVED_MESSAGE } = require("../utils/data");
const { isGoodBodyPart, isGoodCategory } = require("../utils/helper");

jest.mock("../models");
jest.mock("../utils/helper", () => ({
  isGoodBodyPart: jest.fn(),
  isGoodCategory: jest.fn(),
}));

describe("exerciseController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = { params: {}, body: {} };
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should return all exercises", async () => {
    const exercises = [{ id: 1, name: "Push up" }];
    Exercise.findAll.mockResolvedValue(exercises);

    await handleGetAllExercises(request, reply);

    expect(reply.send).toHaveBeenCalledWith(exercises);
  });

  it("should return 404 if no exercises found", async () => {
    Exercise.findAll.mockResolvedValue(null);

    await handleGetAllExercises(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(reply.send).toHaveBeenCalledWith({ error: DATA_NOT_FOUND_ERROR });
  });

  it("should return exercises in a workout", async () => {
    const exercises = [{ id: 1, name: "Squat" }];
    Workout.findByPk.mockResolvedValue({ Exercises: exercises });

    await handleGetExercisesInWorkout(request, reply);

    expect(reply.send).toHaveBeenCalledWith(exercises);
  });

  it("should return 404 if workout or exercises not found", async () => {
    Workout.findByPk.mockResolvedValue(null);

    await handleGetExercisesInWorkout(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(reply.send).toHaveBeenCalledWith({ error: DATA_NOT_FOUND_ERROR });
  });

  it("should create a new exercise when all fields are valid", async () => {
    request.body = {
      name: "Pull up",
      bodyPart: "Back",
      category: "Strength",
    };
    isGoodBodyPart.mockReturnValue(true);
    isGoodCategory.mockReturnValue(true);

    await handleCreateExercise(request, reply);

    expect(Exercise.create).toHaveBeenCalledWith({
      name: "Pull up",
      bodyPart: "Back",
      category: "Strength",
    });
    expect(reply.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(reply.send).toHaveBeenCalledWith({ message: CREATED_MESSAGE });
  });

  it("should return BAD_REQUEST if something is missing", async () => {
    request.body = { bodyPart: "Chest", category: "Strength" };

    await handleCreateExercise(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith({ error: ALL_REQUIRED_ERROR });
  });

  it("should return BAD_REQUEST if bodyPart or category is invalid", async () => {
    request.body = {
      name: "Push up",
      bodyPart: "Unknown",
      category: "Strength",
    };
    isGoodBodyPart.mockReturnValue(false);

    await handleCreateExercise(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(reply.send).toHaveBeenCalledWith({ error: NOT_VALID_DATA_ERROR });
  });

  it("should return 404 if exercise or workout not found", async () => {
    Exercise.findByPk.mockResolvedValue(null);
    Workout.findByPk.mockResolvedValue(null);

    await handleAddExerciseToWorkout(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(reply.send).toHaveBeenCalledWith({ error: DATA_NOT_FOUND_ERROR });
  });

  it("should remove exercise from workout", async () => {
    const mockExercise = { id: 1 };
    const mockWorkout = { removeExercise: jest.fn() };

    Exercise.findByPk.mockResolvedValueOnce(mockExercise);
    Workout.findByPk.mockResolvedValueOnce(mockWorkout);

    await handleRemoveExerciseFromWorkout(request, reply);

    expect(mockWorkout.removeExercise).toHaveBeenCalledWith(mockExercise);
    expect(reply.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(reply.send).toHaveBeenCalledWith({ message: REMOVED_MESSAGE });
  });

  it("should return 404 if exercise or workout not found", async () => {
    Exercise.findByPk.mockResolvedValue(null);
    Workout.findByPk.mockResolvedValue(null);

    await handleRemoveExerciseFromWorkout(request, reply);

    expect(reply.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(reply.send).toHaveBeenCalledWith({ error: DATA_NOT_FOUND_ERROR });
  });
});
