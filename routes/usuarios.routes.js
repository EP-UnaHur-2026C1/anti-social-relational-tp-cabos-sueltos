const { Router } = require("express");
const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controllers.js");

//Importo middleware de validación
const validarUsuario = require("../middlewares/validarUsuario.js");

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", validarUsuario, crearUsuario);
router.put("/:id", validarUsuario, actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
