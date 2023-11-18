"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Follow, Voucher, Livestream, Notification}) {
      // define association here
      // this.hasMany(Book_author, { foreignKey: 'bookid', sourceKey: 'bookId', as: 'author' })
      // this.belongsToMany(Order_detail, { through: "orderDetail_book" });
      // this.hasMany(Rating, {
      //   foreignKey: "book_id",
      //   sourceKey: "bookId",
      //   as: "ratings",
      // });
      this.hasMany(Notification, {
        foreignKey: "typeId",
      })
     
    }
  }
  Type.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        typeName: {
            type: DataTypes.STRING,
          },      
      },
    // {
    //     timestamps: false,
    // },
    {
      timestamps: false,
        sequelize,
        modelName: "Type",
        tableName: "types",
    }
  );
  return Type;
};