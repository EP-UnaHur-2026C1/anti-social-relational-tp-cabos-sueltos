const express = require("express");
const router = express.Router();
const { crearComentario, eliminarComentario } = require("../controllers/comentarios.controllers");


router.post("/", crearComentario);
router.delete("/:id", eliminarComentario);

module.exports = router;