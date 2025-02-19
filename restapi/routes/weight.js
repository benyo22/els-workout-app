const { StatusCodes } = require("http-status-codes");
const { User, Weight } = require("../models");
const { where } = require("sequelize");

module.exports = async (fastify, options) => {
  //get all weight data
  fastify.get(
    "/weight",
    { onRequest: [fastify.auth] },
    async (request, reply) => {
      const userId = request.user.id;
      const user = await User.findByPk(userId);

      const weightData = await Weight.findAll({ where: userId });

      reply.send(weightData);
    }
  );
};
