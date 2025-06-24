const { fastify } = require("./app");
const chalk = require("chalk");
require("dotenv").config();

const PORT = process.env.PORT;

fastify.listen({ PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(chalk.green("Fastify server runs on:", address));
});
