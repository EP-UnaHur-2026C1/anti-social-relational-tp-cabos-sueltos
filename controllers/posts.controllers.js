const { Post, User, Post_Images , Comment, Tag } = require("../models");
const { Op } = require("sequelize"); // Filtro de fechas


/*Para cumplir con "los comentarios más antiguos que X meses no se muestren", calculamos la fecha límite restando los meses (que vienen de process.env.COMMENT_MAX_AGE_MONTHS, por ejemplo 6) a la fecha de hoy, y filtramos con un [Op.gte] (mayor o igual)*/ 
const obtenerPosts = async (req, res) => {
  try {
    // Leemos la variable de entorno, si no existe por defecto usamos 6 meses
    const mesesLimite = parseInt(process.env.COMMENT_MAX_AGE_MONTHS) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    const posts = await Post.findAll({
      include: [
        { model: User, as: "usuario", attributes: { exclude: ["password"] } },
        { model: Post_Images, as: "imagenes" },
        { 
          model: Tag, 
          as: "etiquetas", 
          through: { attributes: [] } // Oculta los datos feos de la tabla intermedia en el JSON
        },
        { 
          model: Comment, 
          as: "comentarios",
          where: {
            fecha: {
              [Op.gte]: fechaLimite // Trae solo comentarios cuya fecha sea >= hoy menos X meses
            }
          },
          required: false, // Evita que si un post no tiene comentarios, deje de mostrar el post
          include: [{ model: User, as: "usuario", attributes: ["id", "nickname"] }] // Opcional: quién comentó
        }
      ],
      order: [["createdAt", "DESC"]] // Opcional: los más nuevos primero
    });
    
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
};




const obtenerPost = async (req, res) => {
  try {
    // El post ya viene cocinado, filtrado y con sus relaciones desde el middleware
    return res.status(200).json(req.post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el post" });
  }
};
/*
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
*/


/*El enunciado dice que opcionalmente se pueden mandar imágenes y etiquetas al publicar. En Sequelize, usamos métodos mágicos como setTags() o addTags() tras crear el post.*/ 
const crearPost = async (req, res) => {
  try {
    // Esperamos recibir texto, userId, y opcionalmente un array de urls de imágenes y un array de ids de tags
    const { texto, userId, imagenes, tags } = req.body; 
    
    // 1. Creamos el Post base
    const post = await Post.create({ texto, userId });

    // 2. Si mandaron imágenes, las creamos asociadas al postId
    if (imagenes && imagenes.length > 0) {
      const mapeoImagenes = imagenes.map(url => ({ imageUrl: url, postId: post.id }));
      await Post_Images.bulkCreate(mapeoImagenes); // bulkCreate inserta muchas filas de golpe
    }

    // 3. Si mandaron IDs de etiquetas (ej: [1, 3]), las vinculamos en la tabla intermedia
    if (tags && tags.length > 0) {
      await post.setEtiquetas(tags); // setEtiquetas es el método mágico que crea Sequelize por el alias "etiquetas"
    }

    // Volvemos a buscar el post completo para devolverlo con todo lo que se creó
    const postCompleto = await Post.findByPk(post.id, {
      include: [
        { model: Post_Images, as: "imagenes" },
        { model: Tag, as: "etiquetas", through: { attributes: [] } }
      ]
    });

    res.status(201).json(postCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el post" });
  }
};


const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, userId } = req.body;
    const post = req.post; // Obtenemos el post validado por el middleware
    await post.update(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post" });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.post; // Obtenemos el post validado por el middleware
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
