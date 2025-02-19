"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MealFood extends Model {
    static associate(models) {
      this.belongsTo(models.Meal, { foreignKey: "mealId" });
      this.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  MealFood.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mealId: {
        allowNull: false,
        references: {
          model: "meals",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
      foodId: {
        allowNull: false,
        references: {
          model: "food",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
      quantityInGrams: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "MealFood",
    }
  );
  return MealFood;
};
