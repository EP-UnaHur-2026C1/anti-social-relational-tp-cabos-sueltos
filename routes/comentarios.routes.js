const express = require("express");
const router = express.Router();
const {
  crearComentario,
  eliminarComentario,
  obtenerComentario,
  actualizarComentario,
} = require("../controllers/comentarios.controllers.js");

router.get("/:id", obtenerComentario);
router.post("/", crearComentario);
router.put("/:id", actualizarComentario);
router.delete("/:id", eliminarComentario);

module.exports = router;
