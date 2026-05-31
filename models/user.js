'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey:"userId",
        as: "posteos"
      })
    }
  }
  User.init({
    nickname: {type:DataTypes.STRING, unique:true}, // se podria usar findOne para buscarlo. es mejor que la pk sea un numero y no un string.
    email: {type:DataTypes.STRING, allowNull:false },
    password: {type:DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};