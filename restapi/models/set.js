"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      this.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
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
        type: DataTypes.INTEGER,
      },
      setNumber: {
        type: DataTypes.INTEGER,
      },
      reps: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        defaultValue: "/",
        type: DataTypes.ENUM("warm-up", "dropset", "failure", "/"),
      },
      distance: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "Set",
    }
  );
  return Set;
};
