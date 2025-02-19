"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sleep extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Sleep.init(
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
      sleepStart: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      sleepEnd: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      durationMin: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quality: {
        allowNull: false,
        type: DataTypes.ENUM("poor", "average", "good", "excellent"),
      },
    },
    {
      sequelize,
      modelName: "Sleep",
    }
  );
  return Sleep;
};
