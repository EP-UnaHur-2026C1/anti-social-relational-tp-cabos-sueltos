const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Red Anti-Social",
      version: "1.0.0",
      description: "Documentación API de Red Anti-Social",
    },
  },

  apis: ["./docs/*.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;