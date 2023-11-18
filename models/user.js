"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Store, Follow, Cart, Feedback, Product_review, Notification, User_role, Order, User_notification}) {
      // define association here
        this.hasMany(User_role,{
            foreignKey: "userId",
        })
        this.hasOne(Store,{
            foreignKey: "userId",
        })
     
        this.hasMany(Follow,{
            foreignKey: "userId",
        })

        this.hasOne(Cart, {
            foreignKey: "userId",
        })

        this.hasMany(Feedback, {
            foreignKey: "userId",
        })

        this.hasMany(Product_review, {
            foreignKey: "userId",
        })

        this.hasMany(Notification, {
            foreignKey: "userId",
        })

        this.hasMany(Order, {
            foreignKey: "userId",
        })

        //////--- Đặc biệt ----------------//
        this.belongsToMany(Notification, {
            through: User_notification,
            foreignKey: "userId",
           })

    }
  }
  User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    },
    {
        timestamps: false,
        sequelize,
        modelName: "User",
        tableName: "users",
      }
  );
  return User;
};