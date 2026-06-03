const express = require("express");
const router = express.Router();
const { obtenerTags, crearTag, obtenerPostsPorTag } = require("../controllers/tags.controllers");

const validarTag = require("../middlewares/validarTag.js");

router.get("/", obtenerTags);
router.post("/", validarTag, crearTag);
router.get("/:id/posts", obtenerPostsPorTag);

module.exports = router;