"use strict";
const { Model } = require("sequelize");
const { product } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Voucher, Order_voucher, Notification, Product, Order_detail, User, Product_detail}) {
      // define association here
        this.belongsToMany(Voucher,{
            through: Order_voucher,
            foreignKey: "orderId",
        })
        // sửa lại
    //     this.belongsToMany(Product, {
    //      through: Order_detail,
    //      foreignKey: "orderId",
    // })
    this.belongsToMany(Product_detail, {
      through: Order_detail,
      foreignKey: "orderId",
 })

        this.belongsTo(User,{
          foreignKey: "userId",
        })
    }
  }
  Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
        order_status: {
            type: DataTypes.ENUM("pending", "completed", "cancel"),
          },
        payment_method: {
            type: DataTypes.ENUM("cash", "paypal"),
          },
        total_price: {
            type: DataTypes.INTEGER,
          },
        shipping_address: {
            type: DataTypes.STRING,
          },
    },
   
    {
      timestamps: false,
        sequelize,
        modelName: "Order",
        tableName: "orders",
    }
  );
  return Order;
};