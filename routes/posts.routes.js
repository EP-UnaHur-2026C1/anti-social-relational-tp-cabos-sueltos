const { Router } = require("express");
const {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/posts.controllers.js");

const router = Router();

router.get("/", obtenerPosts);
router.get("/:id", obtenerPost);
router.post("/", crearPost);
router.put("/:id", actualizarPost);
router.delete("/:id", eliminarPost);

module.exports = router;
