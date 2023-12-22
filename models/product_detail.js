"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart_product, Cart, Product, Order, Order_detail, Variation_option, ProductDetail_VariationOption}) {
      // define association here

      
      // this.belongsTo(Product, {
      //   foreignKey: "productId",
      // })
      this.belongsTo(Product, {
        foreignKey: "productId",
      })
      // this.belongsTo(Variation_option, {
      //   foreignKey: "variation_optionId",
      // })
      this.belongsToMany(Cart, {
        through: Cart_product,
        foreignKey: "productDetailId",
        onDelete: "CASCADE"
      })
      this.hasMany(Cart_product, {
        foreignKey: "productDetailId",
        
      });

      /*order_detail (order + product_detail)*/
      this.belongsToMany(Order, {
        through: Order_detail,
        foreignKey: "productDetailId",
        onDelete: "CASCADE"
      })
      this.hasMany(Order_detail, {
        foreignKey: "productDetailId",
        
      })
      /*end*/
      this.hasMany(ProductDetail_VariationOption, {
        foreignKey: "productDetailId",
      })
      
    }
  }
  Product_detail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
  {
      sequelize,
      timestamps: false,
      // indexes:[
      //   {
      //     unique: true,
      //     fields:['productId', 'sizeId', 'colorId'],
      //   }
      //  ],
      modelName: "Product_detail",
      tableName: "product_detail",
    }
  );
  return Product_detail;
};