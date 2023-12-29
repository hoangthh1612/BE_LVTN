"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Store, Category, Cart, Cart_product, Product_review, Livestream, Livestream_product, Product_detail, Order_detail, Order}) {
      this.belongsTo(Category,{
        foreignKey: "categoryId"
      });
      this.belongsTo(Store,{
        foreignKey: "storeId"
      });
      // this.hasOne(Cart,{
      //   foreignKey: "userId",
      // })
      // this.belongsTo(Cart,{
      //   foreignKey: "cartId"
      // });
    this.hasMany(Product_review, {
      foreignKey: "productId",
    })
    this.belongsToMany(Livestream, {
      through: Livestream_product,
      foreignKey: "productId",
    })

    // this.belongsToMany(Size, {
    //   through: Product_detail,
    //   foreignKey: "productId",
    // })

    // this.belongsToMany(Color, {
    //   through: Product_detail,
    //   foreignKey: "productId",
    // })
    this.hasMany(Product_detail, {
      foreignKey: "productId",
      onDelete: 'CASCADE'
    })
    
    // Không có
    // this.belongsToMany(Order, {
    //   through: Order_detail,
    //   foreignKey: "productId",
    // })

    this.belongsTo(Store, {
      foreignKey: "storeId",
    })
    
    }
  }
  Product.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        product_name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        brand: {
          type: DataTypes.STRING,
        },
        discount_value: {
          type: DataTypes.FLOAT,
        },
        image: {
          type: DataTypes.STRING,
        },
        inLivestream: {
          type: DataTypes.BOOLEAN,
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }

      },
    //   {
    //     timestamps: false,
    //   },
      {
        timestamps: false,
        sequelize,
        modelName: "Product",
        tableName: "products",
      }
  );
  return Product;
};