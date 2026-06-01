const { Router } = require("express");
const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controllers.js");

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
// app.get("/:nickname", async (req, res) => {
//   // buscar usuario especifico
//   try {
//     const { nickname } = req.params;

//     const usuarioEspecifico = await User.findOne({
//       where: {
//         nickname: nickname,
//       },
//       attributes: ["nickname"],
//     });

//     if (!usuarioEspecifico) {
//       res.status(404).json({ message: "el usuario no existe" });
//     }

//     res.status(200).json(usuarioEspecifico);
//   } catch (error) {
//     res.status(500).json({ message: "error del lado del servidor" });
//   }
// });

module.exports = router;
