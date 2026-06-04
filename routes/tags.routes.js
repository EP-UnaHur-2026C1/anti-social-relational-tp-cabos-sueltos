const express = require("express");
const router = express.Router();

const {
  obtenerTags,
  crearTag,
  obtenerPostsPorTag,
  asignarTagAPost,
} = require("../controllers/tags.controllers");
const validarTag = require("../middlewares/validarTag.js");
const {
  validarExiteTagConPosts,
  validarNombreTag,
  validarPostYTag
} = require("../middlewares/validarTagId.js");

router.get("/", obtenerTags);
router.post("/", validarNombreTag, crearTag);
router.get("/:id/posts", validarExiteTagConPosts, obtenerPostsPorTag);
router.post("/:id/posts/:postId", validarPostYTag, asignarTagAPost);

module.exports = router;
