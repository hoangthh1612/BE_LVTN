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
    static associate({
      Voucher,
      Order_voucher,
      Notification,
      Product,
      Order_detail,
      User,
      Product_detail,
    }) {
      // define association here
      this.belongsToMany(Voucher, {
        through: Order_voucher,
        foreignKey: "orderId",
      });
      this.hasMany(Order_voucher, {
        foreignKey: "orderId"
      })

      // sửa lại
      //     this.belongsToMany(Product, {
      //      through: Order_detail,
      //      foreignKey: "orderId",
      // })

      /*order_detail (order + product_detail)*/
      this.belongsToMany(Product_detail, {
        through: Order_detail,
        foreignKey: "orderId",
        onDelete: "CASCADE"
      });
      this.hasMany(Order_detail, {
        foreignKey: "orderId"
      })
      /*end*/

      this.belongsTo(User, {
        foreignKey: "userId",
      });
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
      order_sn: {
        type: DataTypes.STRING,
        unique: true,
      },
      // order_date: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
      order_status: {
        type: DataTypes.ENUM("PENDING", "WAITING_DELIVERY","DELIVERING", "COMPLETED", "CANCELLED"),
        defaultValue: "PENDING"
      },
      payment_method: {
        type: DataTypes.ENUM("cash", "vnpay"),
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      fullname: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      shipping_address: {
        type: DataTypes.STRING,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      shipping_fee: {
        type: DataTypes.INTEGER
      }

    },

    {
      timestamps: true,
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
