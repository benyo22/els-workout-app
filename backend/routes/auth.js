const {
  handleRegister,
  handleLogin,
  handleLogout,
} = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");

module.exports = async (fastify, options) => {
  fastify.post("/register", { schema: registerSchema }, handleRegister);
  fastify.post("/login", { schema: loginSchema }, handleLogin);
  fastify.post("/logout", { onRequest: [fastify.auth] }, handleLogout);
};
