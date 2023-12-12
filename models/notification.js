"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({ User, Order, User_notification, Type }) {
      this.belongsTo(User, { 
            foreignKey: "userId",
       });
       this.belongsToMany(User, {
        through: User_notification,
        foreignKey: "notificationId",
       })
       this.belongsTo(Type, {
        foreignKey: "typeId",
       })
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: "User",
    //       key: "id",
    //     },
        
    //   },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      statusRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }

    //   orderId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: "Order",
    //       key: "id",
    //     },
       
    //   },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
    }
  );
  return Notification;
};
