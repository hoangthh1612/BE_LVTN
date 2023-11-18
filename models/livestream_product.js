"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Livestream_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({  }) {
      // define association here
      
    }
  }
  
  Livestream_product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        orderInLive: {
            type: DataTypes.INTEGER,
        },
        expectedSell: {
            type: DataTypes.INTEGER,
        }
    },

    {
      timestamps: false,
      sequelize,
      modelName: "Livestream_product",
      tableName: "livestream_product",
    }
  );
  return Livestream_product;
};