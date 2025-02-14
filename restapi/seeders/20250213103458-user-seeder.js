"use strict";

const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userCount = 4;

    const users = Array.from({ length: userCount }, () => ({
      name: faker.person.firstName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }));
    await User.bulkCreate(users);

    console.log(chalk.green(`${userCount} db user létrehozva`));
  },

  async down(queryInterface, Sequelize) {},
};
