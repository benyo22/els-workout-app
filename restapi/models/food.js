"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      this.belongsToMany(models.Meal, {
        through: "MealFood",
        foreignKey: "foodId",
      });
      this.hasMany(models.MealFood, { foreignKey: "foodId" });
    }
  }
  Food.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      caloriesPer100g: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      proteinPer100g: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      carbsPer100g: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fatsPer100g: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
