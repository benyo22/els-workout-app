const { StatusCodes } = require("http-status-codes");
const { User, Weight } = require("../models");
const {
  ALL_REQUIRED_ERROR,
  USER_NOT_FOUND_ERROR,
  DATA_NOT_FOUND_ERROR,
} = require("../utils/error");
const {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} = require("../utils/data");
const {
  errorReply,
  createdReply,
  updatedReply,
  deletedReply,
} = require("../utils/reply");

const handleGetAllWeight = async (request, reply) => {
  const { userId } = request.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  const weightData = await Weight.findAll({ where: { userId } });
  if (!weightData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  return reply.send(weightData);
};

const handleCreateWeight = async (request, reply) => {
  const { userId } = request.params;
  const { date, weight } = request.body;
  if (!weight || !date) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  await Weight.create({
    userId,
    weight,
    date,
  });

  return createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleUpdateWeight = async (request, reply) => {
  const { weightId } = request.params;
  const { date, weight } = request.body;

  if (!weight || !date) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const weightData = await Weight.findByPk(weightId);
  if (!weightData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await weightData.update({ weight, date });

  return updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleDeleteWeight = async (request, reply) => {
  const { weightId } = request.params;
  const weight = await Weight.findByPk(weightId);
  if (!weight) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await weight.destroy();

  return deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleCreateWeight,
  handleDeleteWeight,
  handleGetAllWeight,
  handleUpdateWeight,
};
