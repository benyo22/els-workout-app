const { StatusCodes } = require("http-status-codes");
const { Sleep, User } = require("../models");
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

const handleGetAllSleep = async (request, reply) => {
  const { userId } = request.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  const sleepData = await Sleep.findAll({ where: { userId } });
  if (!sleepData) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }

  return reply.send(sleepData);
};

const handleCreateSleep = async (request, reply) => {
  const { userId } = request.params;
  const { date, durationSec, quality } = request.body;
  if (!date || !durationSec || !quality) {
    return errorReply(reply, StatusCodes.BAD_REQUEST, ALL_REQUIRED_ERROR);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return errorReply(reply, StatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }

  await Sleep.create({
    userId,
    date,
    durationSec,
    quality,
  });

  return createdReply(reply, StatusCodes.CREATED, CREATED_MESSAGE);
};

const handleUpdateSleep = async (request, reply) => {
  const { sleepId } = request.params;
  const { date, durationSec, quality } = request.body;
  if (!date || !durationSec || !quality) {
    return errorReply(reply, StatusCodes.NOT_FOUND, ALL_REQUIRED_ERROR);
  }

  const sleep = await Sleep.findByPk(sleepId);
  if (!sleep) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await sleep.update({ date, durationSec, quality });

  return updatedReply(reply, StatusCodes.OK, UPDATED_MESSAGE);
};

const handleDeleteSleep = async (request, reply) => {
  const { sleepId } = request.params;
  const sleep = await Sleep.findByPk(sleepId);
  if (!sleep) {
    return errorReply(reply, StatusCodes.NOT_FOUND, DATA_NOT_FOUND_ERROR);
  }
  await sleep.destroy();

  return deletedReply(reply, StatusCodes.OK, DELETED_MESSAGE);
};

module.exports = {
  handleCreateSleep,
  handleDeleteSleep,
  handleGetAllSleep,
  handleUpdateSleep,
};
