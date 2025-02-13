"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    static associate(models) {
      this.belongsToMany(models.Meal, { through: "MealFood" });
    }
  }
  food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      protein: DataTypes.INTEGER,
      fat: DataTypes.INTEGER,
      carbohydrate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return food;
};
