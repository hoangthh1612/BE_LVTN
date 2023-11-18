"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      // define association here
       this.belongsTo(User, {
        foreignKey: "userId",
       })

       this.belongsTo(Role, {
        foreignKey: "roleId",
       })

    }
  }
  User_role.init(
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
            fields: ['userId', 'roleId']
          }
        ],
        timestamps: false,
        modelName: "User_role",
        tableName: "user_role",
      }
  );
  return User_role;
};