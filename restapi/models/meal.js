"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Food, {
        through: "MealFood",
        foreignKey: "mealId",
      });
      this.hasMany(models.MealFood, { foreignKey: "mealId" });
    }
  }
  Meal.init(
    {
      userId: {
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("breakfast", "lunch", "dinner", "snack"),
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      totalCalories: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      protein: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      carbs: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fats: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Meal",
    }
  );
  return Meal;
};
