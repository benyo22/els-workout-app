const { Sleep, User } = require("../models");
const {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
  DELETED_MESSAGE,
} = require("../utils/data");
const { isGoodSleepQuality } = require("../utils/helper");
const {
  handleGetAllSleep,
  handleCreateSleep,
  handleUpdateSleep,
  handleDeleteSleep,
} = require("../controllers/sleepController");
const { deletedReply, createdReply, updatedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/reply");
jest.mock("../utils/helper");

describe("sleepController test", () => {
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
      },
      body: {
        date: "2025-04-27",
        durationSec: 3600,
        quality: "good",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all sleep data", async () => {
    const sleepData = { date: "2025-11-11", durationSec: 1, quality: "good" };
    User.findByPk.mockResolvedValue({ id: 1 });
    Sleep.findAll.mockResolvedValue(sleepData);

    await handleGetAllSleep(request, reply);

    expect(reply.send).toHaveBeenCalledWith(sleepData);
  });

  it("should create sleep data", async () => {
    User.findByPk.mockResolvedValue({ id: 1 });
    Sleep.create.mockResolvedValue({});
    isGoodSleepQuality.mockReturnValue(true);

    await handleCreateSleep(request, reply);

    expect(isGoodSleepQuality).toHaveBeenCalledWith("good");
    expect(Sleep.create).toHaveBeenCalledWith({
      userId: 1,
      date: "2025-04-27",
      durationSec: 3600,
      quality: "good",
    });
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should update sleep data", async () => {
    const mockSleep = {
      update: jest.fn(),
    };

    Sleep.findByPk.mockResolvedValue(mockSleep);
    isGoodSleepQuality.mockReturnValue(true);

    await handleUpdateSleep(request, reply);

    expect(isGoodSleepQuality).toHaveBeenCalledWith("good");
    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should delete sleep data", async () => {
    const mockSleep = {
      destroy: jest.fn(),
    };

    Sleep.findByPk.mockResolvedValue(mockSleep);

    await handleDeleteSleep(request, reply);

    expect(deletedReply).toHaveBeenCalledWith(reply, 200, DELETED_MESSAGE);
  });
});
