"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Store, Order, Order_voucher, Amount_discount, Percentage_discount, Category }) {
      // define association here
      this.belongsToMany(Order,{
        through: Order_voucher,
        foreignKey: "voucherId",
    })
      this.belongsTo(Store,{
        foreignKey: "storeId",
      })
  
    this.hasOne(Amount_discount, { 
      foreignKey: "voucherId",
    });
    this.hasOne(Percentage_discount, { 
      foreignKey: "voucherId",
     });

    //  this.belongsTo(Category, {
    //   foreignKey: "categoryId",
    //  })

    }
  }
  Voucher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 100],
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // apply: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   // references: {
      //   //   // model: "Categories",
      //   //   model: "Category",
      //   //   key: "id",
      //   // },
      // },
      minSpend: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_usage: {
        type: DataTypes.INTEGER,
        //allowNull: false,
      },
      quantity: DataTypes.INTEGER,
      used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Voucher",
      tableName: "vouchers",
    }
  );
  return Voucher;
};
