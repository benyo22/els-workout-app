"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Weight extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Weight.init(
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
      weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "Weight",
    }
  );
  return Weight;
};
