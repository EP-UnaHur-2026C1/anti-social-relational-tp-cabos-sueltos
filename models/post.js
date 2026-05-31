'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey:"userId",
        as: "usuario"
      })
      Post.hasMany(models.Post_Images, {
        foreignKey: "postId",
        as: "imagenes"
      })
    }
  }
  Post.init({
    texto: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};