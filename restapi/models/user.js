"use strict";
const { Model } = require("sequelize");
const argon2 = require("argon2");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Workout, { foreignKey: "userId" });
      this.hasMany(models.Sleep, { foreignKey: "userId" });
      this.hasMany(models.Meal, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
