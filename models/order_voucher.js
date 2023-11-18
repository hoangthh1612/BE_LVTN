"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ }) {
      // define association here
     
    }
  }
  Order_voucher.init(
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        }
    },
   
    {
        sequelize,
        timestamps: false,
        modelName: "Order_voucher",
        tableName: "order_voucher",
    }
  );
  return Order_voucher;
};