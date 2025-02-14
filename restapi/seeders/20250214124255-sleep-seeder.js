"use strict";

const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { User, Sleep } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    for (const user of users) {
      const sleepCount = faker.number.int({ min: 2, max: 4 });

      const sleep = Array.from({ length: sleepCount }, () => ({
        userId: user.id,
        duration: faker.number.int({ min: 300, max: 600 }),
        quality: faker.helpers.arrayElement([
          "poor",
          "average",
          "good",
          "excellent",
        ]),
      }));
      await Sleep.bulkCreate(sleep);

      console.log(
        chalk.cyan(`User #${user.id} | ${sleepCount} Sleep létrehozva`)
      );
    }
  },

  async down(queryInterface, Sequelize) {},
};
