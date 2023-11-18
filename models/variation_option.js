"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Variation_option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Store, Variation, Product_detail, ProductDetail_VariationOption }) {
      // define association here
    //   this.belongsTo(Store,{
    //     foreignKey: "storeId",
    //   })

    //   this.belongsTo(User,{
       
    //     foreignKey: "userId",
        
    //   })
    // this.hasMany(Product_detail, {
    //     foreignKey: "variation_optionId",
    //   })
    this.hasMany(ProductDetail_VariationOption, {
        foreignKey: "variationOptionId",
      })
      
    this.belongsTo(Variation, {
        foreignKey: "variationId", 
        });

    }
  }
  Variation_option.init(
    {
      id: {
        type: DataTypes.INTEGER,
         primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_value: {
        type: DataTypes.STRING,
        allowNull: false
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
        modelName: "Variation_option",
        tableName: "variation_option",
       
    }
  );
  return Variation_option;
};