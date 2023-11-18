"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Store }) {
      // define association here
      this.belongsTo(Store,{
        foreignKey: "storeId",
      })

      this.belongsTo(User,{
       
        foreignKey: "userId",
        
      })
    }
  }
  Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
         primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    
      
    },
    
    {
        
        sequelize,
        indexes:[
          {
            unique: true,
            fields:['storeId', 'userId'],
          }
         ],
        timestamps: false,
        modelName: "Follow",
        tableName: "follow",
       
    }
  );
  return Follow;
};