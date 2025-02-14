"use strict";

const { Exercise } = require("../models");
const chalk = require("chalk");
const axios = require("axios");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const API_URL = process.env.EXERCISE_API_URL;
    const API_KEY = process.env.EXERCISE_API_KEY;
    const muscles = [
      "abdominals",
      "abductors",
      "adductors",
      "biceps",
      "calves",
      "chest",
      "forearms",
      "glutes",
      "hamstrings",
      "lats",
      "lower_back",
      "middle_back",
      "neck",
      "quadriceps",
      "traps",
      "triceps",
    ];
    const types = [
      "cardio",
      "olympic_weightlifting",
      "plyometrics",
      "powerlifting",
      "strength",
      "stretching",
      "strongman",
    ];
    const difficulties = ["beginner", "intermediate", "expert"];

    for (const muscle of muscles) {
      try {
        const response = await axios.get(API_URL, {
          headers: { "X-Api-Key": API_KEY },
          params: { muscle },
        });

        const exercises = response.data;
        if (exercises.length > 0) {
          await Exercise.bulkCreate(exercises, { ignoreDuplicates: true });
          console.log(
            chalk.magenta(`${exercises.length} ${muscle} Exercise létrehozva`)
          );
        }
      } catch (error) {
        console.error(chalk.red.bold(`Error fetching ${muscle} exercises:`));
      }
    }
    for (const type of types) {
      try {
        const response = await axios.get(API_URL, {
          headers: { "X-Api-Key": API_KEY },
          params: { type },
        });

        const exercises = response.data;
        if (exercises.length > 0) {
          await Exercise.bulkCreate(exercises, { ignoreDuplicates: true });
          console.log(
            chalk.magenta(`${exercises.length} ${type} Exercise létrehozva`)
          );
        }
      } catch (error) {
        console.error(chalk.red.bold(`Error fetching ${type} exercises:`));
      }
    }
    for (const difficulty of difficulties) {
      try {
        const response = await axios.get(API_URL, {
          headers: { "X-Api-Key": API_KEY },
          params: { difficulty },
        });

        const exercises = response.data;
        if (exercises.length > 0) {
          await Exercise.bulkCreate(exercises, { ignoreDuplicates: true });
          console.log(
            chalk.magenta(
              `${exercises.length} ${difficulty} Exercise létrehozva`
            )
          );
        }
      } catch (error) {
        console.error(
          chalk.red.bold(`Error fetching ${difficulty} exercises:`)
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exercises", null, {});
  },
};
