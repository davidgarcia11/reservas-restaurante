const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Importamos la instancia de Sequelize

const Restaurante = sequelize.define('Restaurante', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  tipoComida: { type: DataTypes.STRING },
  fotos: { type: DataTypes.TEXT },
  horario: { type: DataTypes.TEXT },
  capacidad: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Restaurante;