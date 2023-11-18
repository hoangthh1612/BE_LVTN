"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, User_role}) {
      // define association here
      // this.hasMany(Book_author, { foreignKey: 'bookid', sourceKey: 'bookId', as: 'author' })
      // this.belongsToMany(Order_detail, { through: "orderDetail_book" });
      // this.hasMany(Rating, {
      //   foreignKey: "book_id",
      //   sourceKey: "bookId",
      //   as: "ratings",
      // });
      
      this.hasMany(User_role,{
        foreignKey: "roleId"
      });
    
    }
  }
  Role.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        role_name: {
            type: DataTypes.ENUM("buyer", "seller", "admin"),
        },
        
      },
    //   {
    //     timestamps: false,
    //   },
      {
        timestamps: false,
        sequelize,
        modelName: "Role",
        tableName: "roles",
      }
  );
  return Role;
};