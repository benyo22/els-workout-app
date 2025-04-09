"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exerciseId: {
        allowNull: false,
        references: {
          model: "exercises",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: Sequelize.INTEGER,
      },
      workoutId: {
        allowNull: false,
        references: {
          model: "workouts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: Sequelize.INTEGER,
      },
      setNumber: {
        type: Sequelize.INTEGER,
      },
      reps: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      distanceMeter: {
        type: Sequelize.DOUBLE,
      },
      durationSec: {
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        defaultValue: "/",
        type: Sequelize.ENUM("warm-up", "dropset", "failure", "/"),
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
    await queryInterface.dropTable("Sets");
  },
};
