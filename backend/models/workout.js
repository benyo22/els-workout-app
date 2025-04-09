"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Exercise, {
        through: "workoutExercises",
        foreignKey: "workoutId",
      });
      this.hasMany(models.Set, { foreignKey: "workoutId" });
    }
  }
  Workout.init(
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
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      isFinished: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Workout",
    }
  );
  return Workout;
};
