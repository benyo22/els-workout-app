"use strict";

const { faker } = require("@faker-js/faker");
const {
  User,
  Workout,
  Exercise,
  WorkoutExercise,
  Set,
  Meal,
  Food,
  MealFood,
} = require("../models");
const chalk = require("chalk");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Users
    const users = await User.bulkCreate(
      Array.from({ length: 4 }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: 12,
        username: faker.internet.username(),
        password: faker.internet.password(),
      }))
    );

    console.log(chalk.green("✅ Users seeded!"));

    // Create Exercises
    const exercises = await Exercise.bulkCreate(
      Array.from({ length: 5 }, (_, i) => ({
        name: `Exercise ${i + 1}`,
        type: faker.lorem.word(),
        muscle: faker.lorem.word(),
        equipment: faker.lorem.word(),
      }))
    );

    console.log(chalk.blue("✅ Exercises seeded!"));

    // Create Workouts
    const workouts = [];
    for (const user of users) {
      const workoutCount = faker.number.int({ min: 1, max: 2 });

      for (let i = 0; i < workoutCount; i++) {
        const workout = await Workout.create({
          userId: user.id,
          name: `Workout ${i + 1}`,
          date: faker.date.recent(),
        });

        workouts.push(workout);
      }
    }

    console.log(chalk.yellow("✅ Workouts seeded!"));

    // // Create Sets
    // for (const workoutExercise of workoutExercises) {
    //   const setCount = faker.number.int({ min: 2, max: 5 });

    //   for (let i = 0; i < setCount; i++) {
    //     const set = await Set.create({
    //       workoutExerciseId: workoutExercise.id,
    //       setNumber: i + 1,
    //       reps: faker.number.int({ min: 8, max: 15 }),
    //       weight: faker.number.int({ min: 20, max: 100 }),
    //       dropSet: faker.datatype.boolean(),
    //     });

    //     // await workoutExercise.addSet(set);
    //   }
    // }

    // console.log(chalk.cyan("✅ Sets seeded!"));

    // //Create meals
    // const meals = [];
    // for (const user of users) {
    //   const mealCount = faker.number.int({ min: 1, max: 2 });

    //   for (let i = 0; i < mealCount; i++) {
    //     const meal = await Meal.create({
    //       userId: user.id,
    //       name: `Meal ${i + 1}`,
    //       type: faker.helpers.arrayElement([
    //         "breakfast",
    //         "lunch",
    //         "dinner",
    //         "snack",
    //       ]),
    //       date: faker.date.recent(),
    //       totalCalories: faker.number.int({ min: 10, max: 100 }),
    //       protein: faker.number.int({ min: 10, max: 100 }),
    //       carbs: faker.number.int({ min: 10, max: 100 }),
    //       fats: faker.number.int({ min: 10, max: 100 }),
    //     });

    //     meals.push(meal);
    //   }
    // }

    // console.log(chalk.black("✅ Meals seeded!"));

    // //Create food
    // const food = await Food.bulkCreate(
    //   Array.from({ length: 5 }, (_, i) => ({
    //     name: `Food ${i + 1}`,
    //     caloriesPer100g: faker.number.int({ min: 10, max: 100 }),
    //     proteinPer100g: faker.number.int({ min: 10, max: 100 }),
    //     carbsPer100g: faker.number.int({ min: 10, max: 100 }),
    //     fatsPer100g: faker.number.int({ min: 10, max: 100 }),
    //   }))
    // );

    // console.log(chalk.blue("✅ Food seeded!"));

    // const mealFood = [];
    // for (const meal of meals) {
    //   const selectedFood = faker.helpers.arrayElements(food, 2);

    //   for (const food of selectedFood) {
    //     const mf = await MealFood.create({
    //       mealId: meal.id,
    //       foodId: food.id,
    //       quantityInGrams: faker.number.int({ min: 5, max: 10 }),
    //     });

    //     mealFood.push(mf);
    //   }
    // }

    // console.log(chalk.green("✅ MealFood seeded!"));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sets", null, {});
    await queryInterface.bulkDelete("WorkoutExercises", null, {});
    await queryInterface.bulkDelete("Workouts", null, {});
    await queryInterface.bulkDelete("Exercises", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
