const {
  deleteUserSchema,
  getUserSchema,
  updatePasswordSchema,
  updateUserSchema,
} = require("../schemas/userSchemas");
const {
  handleGetUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleDeleteUser,
} = require("../controllers/userController");

module.exports = async (fastify, options) => {
  fastify.get(
    "/user/:id",
    { schema: getUserSchema, onRequest: [fastify.auth] },
    handleGetUser
  );
  fastify.patch(
    "/update-user/:id",
    { schema: updateUserSchema, onRequest: [fastify.auth] },
    handleUpdateUser
  );
  fastify.patch(
    "/update-password/:id",
    {
      schema: updatePasswordSchema,
      onRequest: [fastify.auth],
    },
    handleUpdatePassword
  );
  fastify.delete(
    "/user/:id",
    { schema: deleteUserSchema, onRequest: [fastify.auth] },
    handleDeleteUser
  );
};
