"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      this.belongsTo(models.portfolio, { as: "portfolioId" });
    }
  }
  Stock.init(
    {
      fullname: DataTypes.STRING,
      symbol: DataTypes.STRING,
      share: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
      portfolioId: {
        type: DataTypes.INTEGER,
        references: {
          model: "portfolios",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "stock",
      underscored: true,
    }
  );
  return Stock;
};