"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
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
      caloriesPer100g: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      proteinPer100g: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      carbsPer100g: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      fatsPer100g: {
        allowNull: false,
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("Food");
  },
};
