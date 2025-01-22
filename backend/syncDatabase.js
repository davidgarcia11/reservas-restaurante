const Restaurante = require('./restaurante');  // Importa el modelo Restaurante
const sequelize = require('./database');        // Importa la instancia de Sequelize

(async () => {
  try {
    await sequelize.sync();
    console.log('Tabla "Restaurante" creada con éxito!');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
})();