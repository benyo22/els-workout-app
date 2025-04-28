const { Sleep, User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const {
  ALL_REQUIRED_ERROR,
  DATA_NOT_FOUND_ERROR,
  NOT_VALID_DATA_ERROR,
} = require("../utils/error");
const { CREATED_MESSAGE, REMOVED_MESSAGE } = require("../utils/data");
const { isGoodSleepQuality } = require("../utils/helper");
const { handleGetAllSleep } = require("../controllers/sleepController");

jest.mock("../models");
jest.mock("../utils/helper");

describe("sleepController test", () => {
  let request;
  let reply;

  beforeEach(() => {
    reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    user = {
      id: 1,
      name: "Teszt Elek",
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

  it("should return all sleep data", async () => {
    await handleGetAllSleep(request, reply);
    expect(Sleep.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    expect(reply.send).toHaveBeenCalledWith([
      {
        id: 1,
        userId: 1,
        date: "2025-04-27",
        durationSec: 3600,
        quality: "good",
      },
    ]);
  });
});
