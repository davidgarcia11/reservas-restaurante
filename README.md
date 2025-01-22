Proyecto de Gestión de Reservas y Restaurantes

Este proyecto es una aplicación web que permite gestionar reservas y restaurantes a través de un sistema frontend y backend. Incluye funcionalidades como crear, modificar, eliminar y visualizar reservas y restaurantes.

Estructura del Proyecto

Backend

El backend está desarrollado en Node.js con Express y utiliza SQLite como base de datos.

Frontend

El frontend está desarrollado en React y utiliza Tailwind CSS para el diseño de la interfaz de usuario.

Requisitos Previos

Node.js instalado en el sistema.

Gestor de paquetes npm o yarn.

SQLite3 configurado.

Opcional: Postman o cualquier cliente HTTP para probar las API del backend.

Instrucciones de Puesta en Marcha

1. Configuración del Backend

Ve al directorio del backend:

cd backend

Instala las dependencias:

npm install

Configura las variables de entorno en un archivo .env en la raíz del proyecto. Ejemplo de configuración:

PORT=3001
DB_FILE=database.sqlite

Ejecuta las migraciones para inicializar la base de datos:

npx sequelize-cli db:migrate

Inicia el servidor:

npm start

El servidor estará disponible en http://localhost:3001.

2. Configuración del Frontend

Ve al directorio del frontend:

cd frontend

Instala las dependencias:

npm install

Inicia la aplicación:

npm start

La aplicación estará disponible en http://localhost:3000.

Endpoints del Backend

Restaurantes

GET /restaurantes: Obtener todos los restaurantes.

POST /restaurantes: Crear un nuevo restaurante.

PUT /restaurantes/:id: Modificar un restaurante existente.

DELETE /restaurantes/:id: Eliminar un restaurante.

Reservas

GET /restaurantes/:id/reservas: Obtener todas las reservas de un restaurante.

POST /restaurantes/:id/reservas: Crear una nueva reserva.

PUT /reservas/:id: Modificar una reserva existente.

DELETE /reservas/:id: Eliminar una reserva.

Funcionalidades Principales

Reservas

Crear una nueva reserva.

Modificar una reserva existente.

Eliminar una reserva.

Visualizar todas las reservas de un restaurante.

Restaurantes

Crear un nuevo restaurante.

Modificar la información de un restaurante.

Eliminar un restaurante.

Visualizar todos los restaurantes disponibles.

Tecnologías Utilizadas

Backend

Node.js

Express

SQLite

Frontend

React

React Router

Tailwind CSS

Notas

Asegúrate de que los puertos del frontend y el backend no entren en conflicto.

Configura correctamente las variables de entorno en el archivo .env para la conexión a la base de datos.

En caso de errores, verifica los logs del servidor y la consola del navegador.

