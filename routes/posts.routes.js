const { Router } = require("express");
const {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/posts.controllers.js");

const validarPost = require("../middlewares/validarPost.js");

const router = Router();

router.get("/", obtenerPosts);
router.get("/:id", obtenerPost);
router.post("/", validarPost, crearPost);
router.put("/:id", validarPost, actualizarPost);
router.delete("/:id", eliminarPost);

module.exports = router;
