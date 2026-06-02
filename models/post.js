"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "usuario",
      });
      Post.hasMany(models.Post_Images, {
        foreignKey: "postId",
        as: "imagenes",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comentarios",
      });
      // Relación Muchos a Muchos con Tag
      Post.belongsToMany(models.Tag, {
        through: models.Post_Tags,
        foreignKey: "postId",
        otherKey: "tagId",
        as: "etiquetas",
      });
    }
  }
  Post.init(
    {
      texto: { type: DataTypes.TEXT, allowNull: false },
      fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
