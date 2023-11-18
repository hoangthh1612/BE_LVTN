"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail_VariationOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, User_role, Product_detail, Variation_option}) {
      // define association here
      // this.hasMany(Book_author, { foreignKey: 'bookid', sourceKey: 'bookId', as: 'author' })
      // this.belongsToMany(Order_detail, { through: "orderDetail_book" });
      // this.hasMany(Rating, {
      //   foreignKey: "book_id",
      //   sourceKey: "bookId",
      //   as: "ratings",
      // });
      this.belongsTo(Product_detail, {
        foreignKey: "productDetailId",
        });
        this.belongsTo(Variation_option, {
            foreignKey: "variationOptionId",
        });
      
    }
  }
  ProductDetail_VariationOption.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        
      },
      {
        timestamps: false,
        sequelize,
        modelName: "ProductDetail_VariationOption",
        tableName: "productDetail_VariationOption",
      }
  );
  return ProductDetail_VariationOption;
};