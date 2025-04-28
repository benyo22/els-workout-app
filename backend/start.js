const { fastify } = require("./server");
const chalk = require("chalk");

const port = process.env.PORT || 3000;

fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(chalk.green("Fastify server runs on:", address));
});
