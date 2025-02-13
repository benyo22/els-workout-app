"use strict";

const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    //User
    const userCount = faker.number.int({ min: 5, max: 10 });
    const users = [];

    for (let i = 0; i < userCount; i++) {
      users.push(
        await User.create({
          name: faker.person.firstName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
      );
    }
    console.log(chalk.green(`${userCount} db user létrehozva`));
  },

  async down(queryInterface, Sequelize) {},
};
