const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Restaurante = require('./restaurante'); // Importa el modelo Restaurante

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATEONLY, // Usamos DATEONLY para almacenar solo la fecha
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  numeroPersonas: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define la relación uno-a-muchos
Restaurante.hasMany(Reserva, { foreignKey: 'restauranteId', sourceKey: 'id' }); 
Reserva.belongsTo(Restaurante, { foreignKey: 'restauranteId', targetKey: 'id' }); 

module.exports = Reserva;