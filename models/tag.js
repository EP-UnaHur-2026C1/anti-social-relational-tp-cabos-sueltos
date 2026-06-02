"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Relación Muchos a Muchos con Post a través de una tabla intermedia
      Tag.belongsToMany(models.Post, {
        through: models.Post_Tags, // El mismo modelo intermedio
        foreignKey: "tagId",
        otherKey: "postId",
        as: "posts",
  });
}
  }
  Tag.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};