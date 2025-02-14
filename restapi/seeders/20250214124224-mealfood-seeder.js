"use strict";

const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { User, Meal } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    for (const user of users) {
      // Create meals
      const mealCount = faker.number.int({ min: 2, max: 4 });
      for (let i = 0; i < mealCount; i++) {
        const meal = await Meal.create({
          userId: user.id,
          title: faker.lorem.words(2),
          date: new Date(),
        });
        console.log(
          chalk.blue(`User #${user.id} | ${mealCount} Meal létrehozva`)
        );

        //Add food
        const foodCount = faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < foodCount; j++) {
          await meal.createFood({
            name: faker.food.dish(),
            calories: faker.number.int({ min: 2, max: 10 }),
            protein: faker.number.int({ min: 2, max: 10 }),
            fat: faker.number.int({ min: 2, max: 10 }),
            carbohydrate: faker.number.int({ min: 2, max: 10 }),
          });
        }
        console.log(
          chalk.red(`Meal #${meal.id} | ${foodCount} Food létrehozva`)
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
