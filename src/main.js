require("dotenv").config();
const express = require("express");
const app = express();
const db = require("../models");
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../helpers/swagger");

const usuariosRouter = require("../routes/usuarios.routes.js");
const postsRouter = require("../routes/posts.routes.js");
const postImagesRouter = require("../routes/postImages.routes.js");
const comentariosRouter = require("../routes/comentarios.routes.js");
const tagsRouter = require("../routes/tags.routes.js");

app.use(express.json());
app.use("/usuarios", usuariosRouter);
app.use("/posts", postsRouter);
app.use("/postImages", postImagesRouter);
app.use("/comentarios", comentariosRouter);
app.use("/tags", tagsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Levantamos el servidor usando la variable PORT
const start = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(
        `Servidor de la Red Anti-Social corriendo en http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.log("Error al conectar o sincronizar la base de datos:", error);
  }
};

start();
