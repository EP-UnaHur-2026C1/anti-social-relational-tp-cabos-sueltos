# Red Anti-Social

Backend para la red social **UnaHur Anti-Social Net** desarrollado con Node.js, Express y Sequelize.

![Imagen](./assets/ANTI-SOCIALNET.jpeg)

## Descripción

Este proyecto implementa un backend que permite manejar usuarios, posts, imágenes, comentarios y tags.

- CRUD de usuarios, posts, comentarios, tags e imágenes de post.
- Asociaciones entre posts e imágenes.
- Asociación de tags a posts.
- Documentación Swagger disponible en `/docs`.

## Requisitos

- Node.js
- npm
- SQLite (por defecto), PostgreSQL o MySQL según configuración

## Instalación

1. Clonar el repositorio.
2. Ejecutar:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./data/data.sqlite
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=database_development
DB_USER=anti-social
DB_PASSWORD=
COMMENT_MAX_AGE_MONTHS=6
```

- `PORT`: puerto donde corre el servidor (por defecto 3000).
- `DB_DIALECT`: motor de base de datos (`sqlite`, `postgres`, `mysql`, etc.).
- `DB_STORAGE`: ruta al archivo SQLite cuando se usa `sqlite`.
- `DB_HOST`: host del servidor de base de datos.
- `DB_PORT`: puerto del servidor de base de datos.
- `DB_NAME`: nombre de la base de datos.
- `DB_USER`: usuario de la base de datos.
- `DB_PASSWORD`: contraseña de la base de datos.
- `COMMENT_MAX_AGE_MONTHS`: cantidad de meses para ocultar comentarios antiguos al obtener posts.

## Base de datos

El proyecto usa Sequelize y puede funcionar con otras base de datos de ser necesario.

- Por defecto usa SQLite y guarda la base en `./data/data.sqlite`.
- Para usar Postgres, se debe definir `DB_DIALECT=postgres` y configurar sus debidos: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.

## Ejecución

- En desarrollo:

```bash
npm run dev
```

- Para iniciar el servidor:

```bash
npm start
```

## Documentación

La documentación de la API esta hecha en Swagger se puede visualizar:

- `http://localhost:3000/docs` 

*(3000 es el puerto por defecto, en caso de cambiarlo, cambia la url)*

Los archivos YAML de Swagger están ubicados en `docs/` y se cargan desde `helpers/swagger.js`.

## Endpoints

### Usuarios

| Método | Ruta            | Descripción                |
| ------ | --------------- | -------------------------- |
| GET    | `/usuarios`     | Obtener todos los usuarios |
| POST   | `/usuarios`     | Crear un nuevo usuario     |
| GET    | `/uuarioss/:id` | Obtener usuario por ID     |
| PUT    | `/usuarios/:id` | Actualizar usuario por ID  |
| DELETE | `/usuarios/:id` | Eliminar usuario por ID    |

### Posts

| Método | Ruta                    | Descripción                                    |
| ------ | ----------------------- | ---------------------------------------------- |
| GET    | `/posts`                | Obtener todos los posts                        |
| POST   | `/posts`                | Crear un nuevo post                            |
| GET    | `/posts/:id`            | Obtener post por ID                            |
| PUT    | `/posts/:id`            | Actualizar descripción por ID                  |
| DELETE | `/posts/:id`            | Eliminar post por ID                           |
| GET    | `/posts/:postId/images` | Obtener imagenes de una publicacion específica |
| POST   | `/posts/:postId/images` | Agregar imagen a una publicacion existente     |
| DELETE | `/postImages/:id`       | Eliminar imagen por ID                         |

### Comentarios

| Método | Ruta               | Descripción                              |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/comentarios`     | Crear un nuevo comentario                |
| GET    | `/comentarios/:id` | Obtener comentario por ID                |
| PUT    | `/comentarios/:id` | Actualizar el contenido de un comentario |
| DELETE | `/comentarios/:id` | Eliminar comentario por ID               |

### Tags

| Método | Ruta                           | Descripción                                           |
| ------ | ------------------------------ | ----------------------------------------------------- |
| GET    | `/tags`                        | Obtener etiquetas existentes                          |
| POST   | `/tags`                        | Crear un nuevo tag                                    |
| GET    | `/tags/:id/posts`              | Obtener un tag especifico con todas sus publicaciones |
| POST   | `/tags/posts/:postId/tags/:id` | Agregar una etiqueta a un post existente              |

###

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/I9P6ejM-)

# Red Anti-Social

Se solicita el modelado y desarrollo de un sistema backend para una red social llamada **“UnaHur Anti-Social Net”**, inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas.

![Imagen](./assets/ANTI-SOCIALNET.jpeg)

# Contexto del Proyecto

En una primera reunión con los sponsors del proyecto, se definieron los siguientes requerimientos para el desarrollo de un **MVP (Producto Mínimo Viable)**:

- El sistema debe permitir que un usuario registrado realice una publicación (post), incluyendo **obligatoriamente una descripción**. De forma opcional, se podrán asociar **una o más imágenes** a dicha publicación.

- Las publicaciones pueden recibir **comentarios** por parte de otros usuarios.

- Las publicaciones pueden estar asociadas a **etiquetas (tags)**. Una misma etiqueta puede estar vinculada a múltiples publicaciones.

- Es importante que los **comentarios más antiguos que X meses** (valor configurable mediante variables de entorno, por ejemplo, 6 meses) **no se muestren** en la visualización de los posteos.

####

# Entidades y Reglas de Negocio

Los sponsors definieron los siguientes nombres y descripciones para las entidades:

- **User**: Representa a los usuarios registrados en el sistema. El campo `nickName` debe ser **único** y funcionará como identificador principal del usuario.

- **Post**: Publicación realizada por un usuario en una fecha determinada que contiene el texto que desea publicar. Puede tener **cero o más imágenes** asociadas. Debe contemplarse la posibilidad de **agregar o eliminar imágenes** posteriormente.

- **Post_Images**: Entidad que registra las imágenes asociadas a los posts. Para el MVP, solo se requiere almacenar la **URL de la imagen alojada**.

- **Comment**: Comentario que un usuario puede realizar sobre una publicación. Incluye la fecha en la que fue realizado y una indicación de si está **visible o no**, dependiendo de la configuración (X meses).

- **Tag**: Etiqueta que puede ser asignada a un post. Una etiqueta puede estar asociada a **muchos posts**, y un post puede tener **múltiples etiquetas**.

# Requerimientos Técnicos

1. **Modelado de Datos**
   - Diseñar el **Diagrama Entidad-Relación (DER)** considerando relaciones de tipo uno a muchos y muchos a muchos.

   - Además de las claves primarias, identificar en qué entidades se requiere una **clave única** (`unique key`), y definirla explícitamente.

2. **Desarrollo del Backend**
   - Crear los **endpoints CRUD** necesarios para cada entidad.

   - Implementar las rutas necesarias para gestionar las relaciones entre entidades (por ejemplo: asociar imágenes a un post, etiquetas a una publicación, etc.).

   - Desarrollar las validaciones necesarias para asegurar la integridad de los datos (schemas, validaciones de integridad referencial).

3. **Configuración y Portabilidad**
   - El sistema debe poder cambiar de **base de datos** de forma transparente, utilizando configuración e instalación de dependencias adecuadas.

   - El sistema debe permitir configurar el **puerto de ejecución y variables de entorno** fácilmente.

4. **Documentación**
   - Generar la documentación de la API utilizando **Swagger (formato YAML)**, incluyendo todos los endpoints definidos.

5. **Colecciones de Prueba**
   - Entregar las colecciones necesarias para realizar pruebas (por ejemplo, colecciones de Postman o archivos JSON de ejemplo).

###

# Recomendaciones y ayudas

Les entregamos este link que apunta a un front-end ya desarrollado para que puedan investigarlo y puedan crear el back-end que se ajuste lo máximo posible el funcionamiento del front.

[https://unahur.vmdigitai.com/redes-front/users](https://unahur.vmdigitai.com/redes-front/users)

Por otro lado les dejamos la documentación de los endpoint para que también la puedan revisar y armar siguiendo este link

[https://unahur.vmdigitai.com/swagger/](https://unahur.vmdigitai.com/swagger/)

# Bonus

1. Hace el upload de las imágenes que se asocian a un POST que lo guarden en una carpeta de imágenes dentro del servidor web.
2. ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
3. Como la información de los post no varía muy seguido ¿Qué estrategias podrían utilizar para que la información no sea constantemente consultada desde la base de datos?
