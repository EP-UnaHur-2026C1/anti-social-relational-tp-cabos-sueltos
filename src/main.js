const express = require("express");
const app = express();
const db = require("../models");
const PORT = 3000;
const usuariosRouter = require("../routes/usuarios.routes.js");
const postsRouter = require("../routes/posts.routes.js");
const postImagesRouter = require("../routes/postImages.routes.js");

app.use(express.json());
app.use("/usuarios", usuariosRouter);
app.use("/posts", postsRouter);
app.use("/posts", postImagesRouter);

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
