"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsToMany(models.Workout, {
        through: "workoutExercises",
        foreignKey: "exerciseId",
      });
      this.hasMany(models.WorkoutExercise, { foreignKey: "exerciseId" });
    }
  }
  Exercise.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      muscle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      equipment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Exercise",
    }
  );
  return Exercise;
};
