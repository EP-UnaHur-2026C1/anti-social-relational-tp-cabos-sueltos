const { Comment, User, Post } = require("../models");

const obtenerComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const comentario = await Comment.findByPk(id, {
      include: [
        { model: User, as: "usuario", attributes: { exclude: ["password"] } },
        { model: Post, as: "post" },
      ],
    });

    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el comentario" });
  }
};

// Crear un nuevo comentario
const crearComentario = async (req, res) => {
  try {
    const { contenido, userId, postId } = req.body;

    if (!contenido || !contenido.toString().trim()) {
      return res.status(400).json({ message: "El comentario no puede estar vacio" });
    }

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

const actualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;

    if (!contenido || !contenido.toString().trim()) {
      return res.status(400).json({ message: "El comentario no puede estar vacio" });
    }

    const comentario = await Comment.findByPk(id);

    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    await comentario.update({ contenido });
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el comentario" });
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
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};

module.exports = {
  obtenerComentario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};
