const Restaurante = require('./restaurante');  // Importa el modelo Restaurante
const Reserva = require('./reserva');  // Importa el modelo Reservas
const sequelize = require('./database');        // Importa la instancia de Sequelize

(async () => {
  try {
    await sequelize.sync();
    console.log('Tablas creadas con éxito!');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
})();