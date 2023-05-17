"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
  }
  Market.init(
    {
      symbol: DataTypes.STRING,
      share: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
      fullname: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "market",
      underscored: true,
    }
  );
  return Market;
};