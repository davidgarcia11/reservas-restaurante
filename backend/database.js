const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // El archivo de la base de datos se creará en la carpeta backend
});

module.exports = sequelize;