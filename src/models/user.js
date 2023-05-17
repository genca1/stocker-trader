"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.hasMany(models.portfolio);
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      balance: DataTypes.DECIMAL(10,2),
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};  