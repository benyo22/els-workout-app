const {
  handleGetAllExercises,
  handleGetExercisesInWorkout,
  handleCreateExercise,
  handleAddExerciseToWorkout,
  handleRemoveExerciseFromWorkout,
} = require("../controllers/exerciseController");
const { Exercise, Workout } = require("../models");
const { CREATED_MESSAGE, REMOVED_MESSAGE } = require("../utils/data");
const { isGoodBodyPart, isGoodCategory } = require("../utils/helper");
const { createdReply, removedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/helper");
jest.mock("../utils/reply");

describe("exerciseController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    request = {
      params: { workoutId: 1, exerciseId: 1 },
      body: { name: "Pull up", bodyPart: "Back", category: "Strength" },
    };
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all exercises", async () => {
    const exercises = [{ id: 1, name: "Push up" }];
    Exercise.findAll.mockResolvedValue(exercises);

    await handleGetAllExercises(request, reply);

    expect(reply.send).toHaveBeenCalledWith(exercises);
  });

  it("should return all exercises in a workout", async () => {
    const exercises = [{ id: 1, name: "Squat" }];
    Workout.findByPk.mockResolvedValue({ Exercises: exercises });

    await handleGetExercisesInWorkout(request, reply);

    expect(reply.send).toHaveBeenCalledWith(exercises);
  });

  it("should create an exercise", async () => {
    isGoodBodyPart.mockReturnValue(true);
    isGoodCategory.mockReturnValue(true);

    await handleCreateExercise(request, reply);

    expect(isGoodBodyPart).toHaveBeenCalledWith(request.body.bodyPart);
    expect(isGoodCategory).toHaveBeenCalledWith(request.body.category);
    expect(Exercise.create).toHaveBeenCalledWith(request.body);
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should add exercise to workout", async () => {
    const mockExercise = { id: 1 };
    const mockWorkout = { addExercise: jest.fn() };

    Exercise.findByPk.mockResolvedValueOnce(mockExercise);
    Workout.findByPk.mockResolvedValueOnce(mockWorkout);

    await handleAddExerciseToWorkout(request, reply);
    expect(mockWorkout.addExercise).toHaveBeenCalledWith(mockExercise);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Added exercise to workout successfully",
    });
  });

  it("should remove exercise from workout", async () => {
    const mockExercise = { id: 1 };
    const mockWorkout = { removeExercise: jest.fn() };

    Exercise.findByPk.mockResolvedValueOnce(mockExercise);
    Workout.findByPk.mockResolvedValueOnce(mockWorkout);

    await handleRemoveExerciseFromWorkout(request, reply);
    expect(mockWorkout.removeExercise).toHaveBeenCalledWith(mockExercise);
    expect(removedReply).toHaveBeenCalledWith(reply, 200, REMOVED_MESSAGE);
  });
});
