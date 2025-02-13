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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quality: {
        type: DataTypes.ENUM("poor", "average", "good", "excellent"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sleep",
    }
  );
  return Sleep;
};
