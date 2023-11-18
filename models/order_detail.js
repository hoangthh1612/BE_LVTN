"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product}) {
      // define association here
        // this.belongsToMany(Store, {
        //     through: "follow",
        //     foreignKey: "userId",
        // })
        // this.belongsTo(Order,{
        //     foreignKey: "orderId",
        // })
        // this.belongsTo(Product,{
        //     foreignKey: "productId",
        // })
    }
  }
  
  Order_detail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },   
        // order_id: {
        //     type: DataTypes.NUMBER,
        //     allowNull: false,
        //     primaryKey: true,
        //     foreignKey: true,
        //     references: {
        //       model: "Order",
        //       key: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        //   },
        //   book_id: {
        //     type: DataTypes.NUMBER,
        //     allowNull: false,
        //     primaryKey: true,
        //     foreignKey: true,
        //     references: {
        //       model: "Book",
        //       key: "bookId",
        //     },
        //     onDelete: "NO ACTION",
        //     onUpdate: "CASCADE",
        //   },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: {
                args: [[0]],
                msg: "Value must be greater than zero",
              },
            },
          },
        //   discount: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0,
        //     validate: {
        //       min: {
        //         args: [[0]],
        //         msg: "Value must be beteween 0 and 100",
        //       },
        //       max: {
        //         args: [[100]],
        //         msg: "Value must be beteween 0 and 100",
        //       },
        //     },
        //   },  
        
    },
    {
      timestamps: false,
        sequelize,
        modelName: "Order_detail",
        tableName: "order_detail",
      }
  );
  return Order_detail;
};