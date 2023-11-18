"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Voucher}) {
      // define association here
      // this.hasMany(Book_author, { foreignKey: 'bookid', sourceKey: 'bookId', as: 'author' })
      // this.belongsToMany(Order_detail, { through: "orderDetail_book" });
      // this.hasMany(Rating, {
      //   foreignKey: "book_id",
      //   sourceKey: "bookId",
      //   as: "ratings",
      // });
      this.hasMany(Product, {
        foreignKey: "categoryId"
      })
      this.hasMany(Voucher, {
        foreignKey: "categoryId",
      })
    }
  }
  Category.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        category_name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        image: {
          type: DataTypes.STRING,
        }
      },
    //   {
    //     timestamps: false,
    //   },
      {
        sequelize,
        timestamps: false,
        modelName: "Category",
        tableName: "categorys",
      }
  );
  return Category;
};