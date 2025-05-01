const {
  handleGetSetsInExercise,
  handleAddSetToExercise,
  handleUpdateSet,
  handleBulkUpdateSets,
  handleDeleteSet,
  handleDeleteAllSetsInExercise,
} = require("../controllers/setController");
const { Workout, Exercise, Set } = require("../models");
const {
  errorReply,
  updatedReply,
  deletedReply,
  createdReply,
} = require("../utils/reply");
const {
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { isGoodSetType } = require("../utils/helper");
const {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
  DELETED_MESSAGE,
} = require("../utils/data");
const { StatusCodes } = require("http-status-codes");

jest.mock("../models");
jest.mock("../utils/reply");
jest.mock("../utils/helper");

describe("setController test", () => {
  let request, reply;

  beforeEach(() => {
    request = {
      params: { exerciseId: 1, workoutId: 1, setId: 1 },
      body: {
        setNumber: 1,
        reps: 10,
        weight: 50,
        durationSec: null,
        distanceMeter: null,
        type: "barbell",
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

  it("should return sets", async () => {
    const sets = [{ id: 1 }, { id: 2 }];
    Set.findAll.mockResolvedValue(sets);

    await handleGetSetsInExercise(request, reply);

    expect(reply.send).toHaveBeenCalledWith(sets);
  });

  it("should create a new set", async () => {
    Exercise.findByPk.mockResolvedValue({ id: 1 });
    Workout.findByPk.mockResolvedValue({ id: 1 });
    const newSet = {
      exerciseId: request.params.exerciseId,
      workoutId: request.params.workoutId,
      setNumber: null,
      reps: null,
      weight: null,
      durationSec: null,
      distanceMeter: null,
    };
    Set.create.mockResolvedValue(newSet);

    await handleAddSetToExercise(request, reply);

    expect(Set.create).toHaveBeenCalledWith(newSet);
    expect(reply.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(reply.send).toHaveBeenCalledWith(newSet);
  });

  it("should update a set", async () => {
    isGoodSetType.mockReturnValue(true);
    const set = { update: jest.fn() };
    Set.findByPk.mockResolvedValue(set);

    await handleUpdateSet(request, reply);

    expect(set.update).toHaveBeenCalledWith(request.body);
    expect(updatedReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.OK,
      UPDATED_MESSAGE
    );
  });

  it("should update all sets", async () => {
    const setsToUpdate = [
      { id: 1, type: "barbell", reps: 10, setNumber: 1, update: jest.fn() },
      { id: 2, type: "dumbell", reps: 12, setNumber: 2, update: jest.fn() },
    ];
    isGoodSetType.mockReturnValue(true);
    request.body = setsToUpdate;

    await handleBulkUpdateSets(request, reply);

    expect(updatedReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.OK,
      UPDATED_MESSAGE
    );
  });

  it("should return error if one of the set types is invalid", async () => {
    request.body = [{ id: 1, type: "invalid" }];
    isGoodSetType.mockReturnValue(false);

    await handleBulkUpdateSets(request, reply);

    expect(errorReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.CONFLICT,
      NOT_VALID_DATA_ERROR
    );
    expect(Set.update).not.toHaveBeenCalled();
  });

  it("should delete the set", async () => {
    const set = { destroy: jest.fn() };
    Set.findByPk.mockResolvedValue(set);

    await handleDeleteSet(request, reply);

    expect(set.destroy).toHaveBeenCalled();
    expect(deletedReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.OK,
      DELETED_MESSAGE
    );
  });

  it("should delete all sets in an exercise", async () => {
    const sets = [{ id: 1 }, { id: 2 }];
    Set.findAll.mockResolvedValue(sets);
    Set.destroy.mockResolvedValue();

    await handleDeleteAllSetsInExercise(request, reply);

    expect(Set.destroy).toHaveBeenCalledTimes(sets.length);
    expect(deletedReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.OK,
      DELETED_MESSAGE
    );
  });

  it("should return error if no sets found", async () => {
    Set.findAll.mockResolvedValue(null);

    await handleDeleteAllSetsInExercise(request, reply);

    expect(errorReply).toHaveBeenCalledWith(
      reply,
      StatusCodes.NOT_FOUND,
      DATA_NOT_FOUND_ERROR
    );
  });
});
