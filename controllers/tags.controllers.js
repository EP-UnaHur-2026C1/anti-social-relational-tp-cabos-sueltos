const { Tag, Post } = require("../models");

// Obtener todos los tags existentes
const obtenerTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las etiquetas" });
  }
};

// Crear una nueva etiqueta (ej: "Programacion")
const crearTag = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre de la etiqueta es obligatorio" });
    }

    // Buscamos si ya existe para no duplicar (ya que es UNIQUE)
    const tagExiste = await Tag.findOne({ where: { nombre } });
    if (tagExiste) {
      return res.status(400).json({ message: "La etiqueta ya existe" });
    }

    const nuevoTag = await Tag.create({ nombre });
    res.status(201).json(nuevoTag);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la etiqueta" });
  }
};

// Obtener un tag específico con todos los posts que lo usan
const obtenerPostsPorTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: Post,
          as: "posts",
          through: { attributes: [] }, // Oculta la tabla intermedia
        }
      ]
    });

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts de la etiqueta" });
  }
};

module.exports = {
  obtenerTags,
  crearTag,
  obtenerPostsPorTag,
};