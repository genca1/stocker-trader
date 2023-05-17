"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.user, { as: "owner" });
    }
  }
  Order.init(
    {
      orderType: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      priceByShare: DataTypes.DECIMAL(10,2),
      totalPrice: DataTypes.DECIMAL(10,2),
      stock: DataTypes.STRING,
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return Order;
};