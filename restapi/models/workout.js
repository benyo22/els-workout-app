"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Exercise, { through: "WorkoutExercise" });
    }
  }
  Workout.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Workout",
    }
  );
  return Workout;
};
