"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      this.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
      });
      this.belongsTo(models.Workout, {
        foreignKey: "workoutId",
      });
    }
  }
  Set.init(
    {
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
      setNumber: {
        type: DataTypes.INTEGER,
      },
      reps: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      distance: {
        type: DataTypes.DOUBLE,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        defaultValue: "/",
        type: DataTypes.ENUM("warm-up", "dropset", "failure", "/"),
      },
    },
    {
      sequelize,
      modelName: "Set",
    }
  );
  return Set;
};
