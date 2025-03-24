"use strict";
const { Model } = require("sequelize");
const argon2 = require("argon2");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Workout, { foreignKey: "userId" });
      this.hasMany(models.Weight, { foreignKey: "userId" });
      this.hasMany(models.Sleep, { foreignKey: "userId" });
      this.hasMany(models.Meal, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await argon2.hash(user.password, {
            type: argon2.argon2id,
          });
          user.password = hashedPassword;
        },
      },
    }
  );
  return User;
};
