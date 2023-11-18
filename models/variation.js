"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Store, Variation_option }) {
      // define association here
    //   this.belongsTo(Store,{
    //     foreignKey: "storeId",
    //   })

    //   this.belongsTo(User,{
       
    //     foreignKey: "userId",
        
    //   })

    this.hasMany(Variation_option, {
        foreignKey: "variationId",
        });
    }
  }
  Variation.init(
    {
      id: {
        type: DataTypes.INTEGER,
         primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    
    },
    
    {
        
        sequelize,
        // indexes:[
        //   {
        //     unique: true,
        //     fields:['storeId', 'userId'],
        //   }
        //  ],
        timestamps: false,
        modelName: "Variation",
        tableName: "variation",
       
    }
  );
  return Variation;
};