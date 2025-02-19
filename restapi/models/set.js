"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      this.belongsTo(models.WorkoutExercise, {
        foreignKey: "workoutExerciseId",
      });
    }
  }
  Set.init(
    {
      workoutExerciseId: {
        allowNull: false,
        references: {
          model: "workoutExercises",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: DataTypes.INTEGER,
      },
      setNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      reps: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dropSet: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Set",
    }
  );
  return Set;
};
