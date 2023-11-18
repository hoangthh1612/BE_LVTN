"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
        // this.belongsTo(User,{
        //     foreignKey: "userId",
        // })
        this.belongsTo(User, {
            foreignKey: "userId",
        })
        this.belongsTo(Product, {
            foreignKey: "productId",
        })
    }
  }
  Product_review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        review_title: {
            type: DataTypes.STRING
        },
        review_content: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.FLOAT
        },
        review_date: {
            type: DataTypes.DATE
        },

    },
    {
        timestamps: false,
        sequelize,
        modelName: "Product_review",
        tableName: "product_review",
      }
  );
  return Product_review;
};