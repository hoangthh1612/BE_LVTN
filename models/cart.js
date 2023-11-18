"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User, Cart, Cart_product}) {
      // define association here
        this.belongsTo(User,{
            foreignKey: "userId",
        })
        this.belongsToMany(Product,{
            through: Cart_product,
            foreignKey: "cartId",
        })
      
    }
  }
  Cart.init( 
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        // cart_date: {
        //   type: DataTypes.DATE,
        // },
        // quantity: {
        //   type: DataTypes.INTEGER,
        // },
    },
    {
        timestamps: false,
        sequelize,
        modelName: "Cart",
        tableName: "carts",
      }
    );
  return Cart;
};