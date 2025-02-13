"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Food, { through: "MealFood" });
    }
  }
  Meal.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Meal",
    }
  );
  return Meal;
};
