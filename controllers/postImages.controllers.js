const { Post, User, Post_Images } = require("../models");

const obtenerPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    const imagenes = await Post_Images.findAll({
      where: { postId: postId },
    });
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error la imagen" });
  }
};

const crearPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const { imageUrl } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    const imagen = await Post_Images.create({
      postId: postId,
      imageUrl: imageUrl,
    });
    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la imagen" });
  }
};

const eliminarPostImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Post_Images.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrado" });
    }
    await imagen.destroy();
    res.status(200).json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};

module.exports = {
  obtenerPostImage,
  crearPostImage,
  eliminarPostImage,
};
