const { Weight, User } = require("../models");
const {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
  DELETED_MESSAGE,
} = require("../utils/data");
const {
  handleGetAllWeight,
  handleCreateWeight,
  handleUpdateWeight,
  handleDeleteWeight,
} = require("../controllers/weightController");
const { deletedReply, createdReply, updatedReply } = require("../utils/reply");

jest.mock("../models");
jest.mock("../utils/reply");

describe("weightController test", () => {
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
        weightId: 1,
      },
      body: {
        date: "2025-04-27",
        weight: 100,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all weight data", async () => {
    const weightData = { date: "2025-11-11", weight: 100 };
    User.findByPk.mockResolvedValue({ id: 1 });
    Weight.findAll.mockResolvedValue(weightData);

    await handleGetAllWeight(request, reply);

    expect(reply.send).toHaveBeenCalledWith(weightData);
  });

  it("should create weight", async () => {
    User.findByPk.mockResolvedValue({ id: 1 });
    Weight.create.mockResolvedValue({});

    await handleCreateWeight(request, reply);

    expect(Weight.create).toHaveBeenCalledWith({
      userId: 1,
      date: "2025-04-27",
      weight: 100,
    });
    expect(createdReply).toHaveBeenCalledWith(reply, 201, CREATED_MESSAGE);
  });

  it("should update weight", async () => {
    const mockWeight = {
      update: jest.fn(),
    };

    Weight.findByPk.mockResolvedValue(mockWeight);

    await handleUpdateWeight(request, reply);

    expect(updatedReply).toHaveBeenCalledWith(reply, 200, UPDATED_MESSAGE);
  });

  it("should delete weightd", async () => {
    const mockWeight = {
      destroy: jest.fn(),
    };

    Weight.findByPk.mockResolvedValue(mockWeight);

    await handleDeleteWeight(request, reply);

    expect(deletedReply).toHaveBeenCalledWith(reply, 200, DELETED_MESSAGE);
  });
});
