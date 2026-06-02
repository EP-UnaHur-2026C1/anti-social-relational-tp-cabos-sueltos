const express = require("express");
const router = express.Router();
const { obtenerTags, crearTag, obtenerPostsPorTag } = require("../controllers/tags.controllers");


router.get("/", obtenerTags);
router.post("/", crearTag);
router.get("/:id/posts", obtenerPostsPorTag);

module.exports = router;