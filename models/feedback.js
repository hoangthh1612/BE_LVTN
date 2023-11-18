"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
        this.belongsTo(User,{
            foreignKey: "userId",
        })
    }
  }

  Feedback.init(
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
        content: {
          type: DataTypes.STRING,
        },
        dateFeedback: {
          type: DataTypes.DATE,
        }
         
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Feedback",
      tableName: "feedbacks",
    }
  );
  return Feedback;
};