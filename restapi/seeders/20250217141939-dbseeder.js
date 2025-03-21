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
    const exercises = [
      { name: "Fekvenyomás", bodyPart: "chest", category: "barbell" },
      { name: "Guggolás", bodyPart: "legs", category: "barbell" },
      { name: "Felhúzás", bodyPart: "back", category: "barbell" },
      { name: "Vállból nyomás", bodyPart: "shoulders", category: "barbell" },
      { name: "Evezés", bodyPart: "back", category: "barbell" },
      { name: "Bicepsz", bodyPart: "arms", category: "dumbell" },
      { name: "Tricepsz letolás", bodyPart: "arms", category: "dumbell" },
      { name: "Oldalemelés", bodyPart: "shoulders", category: "dumbell" },
      { name: "Fekvenyomás", bodyPart: "chest", category: "dumbell" },
      { name: "Felhúzás", bodyPart: "back", category: "dumbell" },
      { name: "Húzódzkodás", bodyPart: "back", category: "bodyweight" },
      { name: "Fekvőtámasz", bodyPart: "chest", category: "bodyweight" },
      { name: "Plank", bodyPart: "core", category: "duration" },
      { name: "Felülés", bodyPart: "core", category: "bodyweight" },
      { name: "Kitörés", bodyPart: "legs", category: "bodyweight" },
      { name: "Burpee", bodyPart: "full body", category: "bodyweight" },
      { name: "Dobozra ugrás", bodyPart: "legs", category: "bodyweight" },
      { name: "Ugrókötél", bodyPart: "legs", category: "duration" },
      { name: "Futás", bodyPart: "legs", category: "distance" },
      { name: "Kerékpározás", bodyPart: "legs", category: "cardio" },
      { name: "Evezőgép", bodyPart: "full body", category: "distance" },
      { name: "Úszás", bodyPart: "full body", category: "distance" },
      { name: "Elliptikus tréner", bodyPart: "other", category: "duration" },
      { name: "Séta", bodyPart: "legs", category: "duration" },
      { name: "Lépcső gép", bodyPart: "legs", category: "duration" },
      { name: "Russian Twist", bodyPart: "core", category: "bodyweight" },
      { name: "Lógó lábemelés", bodyPart: "core", category: "bodyweight" },
      { name: "Tolódzkodás", bodyPart: "chest", category: "bodyweight" },
      { name: "Farmer séta", bodyPart: "full body", category: "dumbell" },
      { name: "Szán tolás", bodyPart: "full body", category: "other" },
      { name: "Kötélcsapkodás", bodyPart: "full body", category: "cardio" },
      { name: "Oldalsó plank", bodyPart: "core", category: "duration" },
      { name: "Homorítás", bodyPart: "core", category: "machine" },
      {
        name: "Tárogatás",
        bodyPart: "chest",
        category: "cable",
      },
      { name: "Face pulls", bodyPart: "shoulders", category: "cable" },
      { name: "Lábemelés", bodyPart: "core", category: "bodyweight" },
      { name: "Kalapács bicepsz", bodyPart: "arms", category: "dumbell" },
    ];

    await Exercise.bulkCreate(exercises);

    console.log(chalk.green("Exercises created!"));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sets", null, {});
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
