"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
      });
    }
  }
  Set.init(
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
      setNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      reps: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("warm-up", "dropset", "failure"),
      },
    },
    {
      sequelize,
      modelName: "Set",
    }
  );
  return Set;
};
