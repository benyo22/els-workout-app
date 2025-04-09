"use strict";

const chalk = require("chalk");
const { Exercise, Food } = require("../models");
const { exercises, food } = require("../utils/helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Exercise.bulkCreate(exercises);
    console.log(chalk.green(`${exercises.length} exercises created!`));

    await Food.bulkCreate(foods);
    console.log(chalk.blue(`${foods.length} foods created!`));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sets", null, {});
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
