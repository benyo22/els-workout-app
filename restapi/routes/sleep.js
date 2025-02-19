const { StatusCodes } = require("http-status-codes");
const { User, Sleep } = require("../models");
const { where } = require("sequelize");

module.exports = async (fastify, options) => {
  //get all sleep data
  fastify.get(
    "/sleep",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const userId = request.user.id;
      const user = await User.findByPk(userId);

      const sleepData = await Sleep.findAll({ where: userId });

      reply.send(sleepData);
    }
  );
};
