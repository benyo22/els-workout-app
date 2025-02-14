"use strict";

const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { User, Workout } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    for (const user of users) {
      const workoutCount = faker.number.int({ min: 1, max: 3 });

      const workouts = Array.from({ length: workoutCount }, () => ({
        userId: user.id,
        name: faker.lorem.words(2),
      }));
      await Workout.bulkCreate(workouts);

      console.log(
        chalk.yellow(`User #${user.id} | ${workoutCount} Workout létrehozva`)
      );
    }
  },

  async down(queryInterface, Sequelize) {},
};
