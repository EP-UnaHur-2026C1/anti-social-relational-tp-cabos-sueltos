/*El enunciado pide que el comentario tenga texto (o contenido), la fecha de realización y pertenezca a un usuario y a un post.*/ 

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Un comentario pertenece a un usuario
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "usuario",
      });
      // Un comentario pertenece a un post
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  Comment.init(
    {
      contenido: { type: DataTypes.TEXT, allowNull: false },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};