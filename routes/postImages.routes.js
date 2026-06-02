const { Router } = require("express");
const {
  obtenerPostImage,
  crearPostImage,
  eliminarPostImage,
} = require("../controllers/postImages.controllers.js");

const router = Router();

router.get("/:postId/imagenes", obtenerPostImage);
router.post("/:postId/imagenes", crearPostImage);
router.delete("/imagenes/:id", eliminarPostImage);

module.exports = router;
