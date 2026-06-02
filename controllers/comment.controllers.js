const { Comment, User, Post } = require("../models");

// Crear un nuevo comentario
const crearComentario = async (req, res) => {
  try {
    const { contenido, userId, postId } = req.body;

    // Validaciones básicas de integridad referencial
    const usuarioExiste = await User.findByPk(userId);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const postExiste = await Post.findByPk(postId);
    if (!postExiste) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Creamos el comentario (la fecha se asigna sola por el CURRENT_TIMESTAMP)
    const nuevoComentario = await Comment.create({ contenido, userId, postId });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario" });
  }
};

// Eliminar un comentario
const eliminarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const comentario = await Comment.findByPk(id);
    
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    await comentario.destroy();
    res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};

module.exports = {
  crearComentario,
  eliminarComentario,
};