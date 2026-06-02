const { Post, User, Post_Images } = require("../models");

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "usuario", attributes: { exclude: ["password"] } },
        { model: Post_Images, as: "imagenes" },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts" });
  }
};

const obtenerPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: "usuario", attributes: { exclude: ["password"] } },
        { model: Post_Images, as: "imagenes" },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post" });
  }
};

const crearPost = async (req, res) => {
  try {
    const { texto, userId } = req.body;
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const post = await Post.create({ texto, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post" });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, userId } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    await post.update(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post" });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post" });
  }
};

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
};
