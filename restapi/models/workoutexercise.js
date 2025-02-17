"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkoutExercise extends Model {
    static associate(models) {
      WorkoutExercise.belongsTo(models.Workout, { foreignKey: "workoutId" });
      WorkoutExercise.belongsTo(models.Exercise, { foreignKey: "exerciseId" });
      WorkoutExercise.hasMany(models.Set, { foreignKey: "workoutExerciseId" });
    }
  }
  WorkoutExercise.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      workoutId: {
        allowNull: false,
        references: {
          model: "workouts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
      exerciseId: {
        allowNull: false,
        references: {
          model: "exercises",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "WorkoutExercise",
    }
  );
  return WorkoutExercise;
};
