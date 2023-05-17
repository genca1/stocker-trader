"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {

    static associate(models) {
      this.hasMany(models.stock);
      this.belongsTo(models.user, { as: "owner" });
    }
  }
  Portfolio.init(
    {
      fullname: DataTypes.STRING,
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
      modelName: "portfolio",
      underscored: true,
    }
  );
  return Portfolio;
};