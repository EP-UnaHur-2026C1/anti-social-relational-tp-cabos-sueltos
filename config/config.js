require("dotenv").config(); // Permite leer el archivo .env

module.exports = {
  development: {
    // Si en el .env se define un dialecto (ej: 'postgres'), lo usa. Si no, por defecto usa 'sqlite'
    dialect: process.env.DB_DIALECT || "sqlite",

    // Configuración específica para SQLite (solo se aplica si el dialecto es sqlite)
    storage: process.env.DB_STORAGE || "./data/data.sqlite",

    // Configuración para motores externos (MySQL, PostgreSQL, MariaDB, SQL Server)
    username: process.env.DB_USER || "anti-social",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432, // Puerto por defecto
    logging: false, // Evita llenar la consola de consultas SQL (opcional)
  },
  test: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: "./data/data_test.sqlite",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
  },
  production: {
    dialect: process.env.DB_DIALECT || "mysql",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_production",
    host: process.env.DB_HOST || "127.0.0.1",
  },
};
