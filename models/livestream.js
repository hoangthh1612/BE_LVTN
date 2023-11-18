"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Livestream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Livestream_product, Store}) {
      // define association here
      this.belongsToMany(Product, {
        through: Livestream_product,
        foreignKey: "livestreamId",
      })

      this.belongsTo(Store, {
        foreignKey: "storeId",
      })
    }
  }
  Livestream.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      // userId_create: {
      //   type: DataTypes.INTEGER,
      // },
      roomId: {
        type: DataTypes.STRING,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Livestream",
      tableName: "livestreams",
    }
  );
  return Livestream;
};