"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Exercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bodyPart: {
        allowNull: false,
        type: Sequelize.ENUM(
          "core",
          "arms",
          "back",
          "chest",
          "legs",
          "shoulders",
          "other",
          "full body"
        ),
      },
      category: {
        allowNull: false,
        type: Sequelize.ENUM(
          "barbell",
          "dumbell",
          "cable",
          "machine",
          "bodyweight",
          "cardio",
          "duration",
          "distance",
          "other"
        ),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Exercises");
  },
};
