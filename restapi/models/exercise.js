"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsToMany(models.Workout, {
        through: "workoutExercises",
        foreignKey: "exerciseId",
      });
      this.hasMany(models.Set, { foreignKey: "exerciseId" });
    }
  }
  Exercise.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bodyPart: {
        allowNull: false,
        type: DataTypes.ENUM(
          "core",
          "arms",
          "back",
          "chest",
          "legs",
          "shoulders",
          "other",
          "full body,",
          "cardio"
        ),
      },
      category: {
        allowNull: false,
        type: DataTypes.ENUM(
          "barbell",
          "dumbell",
          "machine/other",
          "bodyweight",
          "cardio",
          "duration"
        ),
      },
    },
    {
      sequelize,
      modelName: "Exercise",
    }
  );
  return Exercise;
};
