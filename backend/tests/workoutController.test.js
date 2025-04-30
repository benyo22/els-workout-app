const {
  handleGetAllWorkouts,
  handleCreateWorkout,
  handleDeletWorkout,
  handleUpdateWorkout,
} = require("../controllers/workoutController");
const { Workout, User } = require("../models");
const {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
  DELETED_MESSAGE,
} = require("../utils/data");
const { deletedReply, createdReply, updatedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/reply");
jest.mock("../utils/helper");

describe("workoutController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    request = {
      params: {
        userId: 1,
        sleepId: 1,
        exerciseId: 1,
      },
      body: {
        name: "teszt",
        date: "2025-04-27",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all workout data", async () => {
    const workouts = {
      name: "teszt",
      date: "2025-11-11",
    };
    User.findByPk.mockResolvedValue({ id: 1 });
    Workout.findAll.mockResolvedValue(workouts);

    await handleGetAllWorkouts(request, reply);

    expect(reply.send).toHaveBeenCalledWith(workouts);
  });

  it("should create workout", async () => {
    User.findByPk.mockResolvedValue({ id: 1 });
    Workout.create.mockResolvedValue({});

    await handleCreateWorkout(request, reply);

    expect(Workout.create).toHaveBeenCalledWith({
      date: "2025-04-27",
      isFinished: false,
      name: "teszt",
      userId: 1,
    });
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should update workout", async () => {
    const mockWorkout = {
      update: jest.fn(),
    };

    Workout.findByPk.mockResolvedValue(mockWorkout);

    await handleUpdateWorkout(request, reply);

    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should delete workout", async () => {
    const mockWorkout = {
      destroy: jest.fn(),
    };

    Workout.findByPk.mockResolvedValue(mockWorkout);

    await handleDeletWorkout(request, reply);

    expect(deletedReply).toHaveBeenCalledWith(reply, 200, DELETED_MESSAGE);
  });
});
