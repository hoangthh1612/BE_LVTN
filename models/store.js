"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Follow, Voucher, Livestream, Product}) {
      // define association here
      // this.hasMany(Book_author, { foreignKey: 'bookid', sourceKey: 'bookId', as: 'author' })
      // this.belongsToMany(Order_detail, { through: "orderDetail_book" });
      // this.hasMany(Rating, {
      //   foreignKey: "book_id",
      //   sourceKey: "bookId",
      //   as: "ratings",
      // });
      this.belongsTo(User, {
        foreignKey: "userId",
      })
      // this.belongsToMany(User,{
      //   through:"follow",
      //   foreignKey: "storeId",
      // })

      this.hasMany(Follow,{
          foreignKey: "storeId",
      })

      this.hasMany(Voucher,{
        foreignKey: "storeId",
      })

      this.hasMany(Livestream, {
        foreignKey: "storeId",
      })


      this.hasMany(Product, {
        foreignKey: "storeId",
      })
    }
  }
  Store.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        shop_name: {
          type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
          },
        
        phone_number: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        
      },
    // {
    //     timestamps: false,
    // },
    {
      timestamps: false,
        sequelize,
        modelName: "Store",
        tableName: "stores",
    }
  );
  return Store;
};