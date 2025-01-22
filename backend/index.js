const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const app = express();
const port = 3001;
const Restaurante = require('./restaurante'); // Importa el modelo Restaurante

// Middleware para procesar datos en formato JSON
app.use(express.json());
app.use(cors());

//-----------
// RESTAURANTES
//-----------
// POST
// Ruta para crear un nuevo restaurante
app.post('/restaurantes', async (req, res) => {
  try {
    const nuevoRestaurante = await Restaurante.create(req.body);
    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    console.error('Error al crear el restaurante:', error);
    res.status(500).json({ error: 'Error al crear el restaurante' });
  }
});

//-----------
//GET
// Ruta para obtener un restaurante por su ID
app.get('/restaurantes/:id', async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id);
    if (restaurante) {
      res.json(restaurante);
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el restaurante:', error);
    res.status(500).json({ error: 'Error al buscar el restaurante' });
  }
});

// Ruta para buscar restaurantes por nombre
app.get('/restaurantes', async (req, res) => {
  try {
    const { nombre } = req.query;
    const whereClause = {};

    if (nombre) {
      whereClause.nombre = { [Op.like]: `%${nombre}%` };
    }

    const restaurantes = await Restaurante.findAll({ where: whereClause });
    res.json(restaurantes);
  } catch (error) {
    console.error('Error al buscar restaurantes:', error);
    res.status(500).json({ error: 'Error al buscar restaurantes' });
  }
});

//-----------
//PUT
// Ruta para actualizar un restaurante por su ID
app.put('/restaurantes/:id', async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id);
    if (restaurante) {
      await restaurante.update(req.body);
      res.json(restaurante);
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    res.status(500).json({ error: 'Error al actualizar el restaurante' });
  }
});


// Ruta para actualizar un restaurante por su nombre
app.put('/restaurantes', async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ error: 'Debes proporcionar el nombre del restaurante' });
    }

    const restaurante = await Restaurante.findOne({ where: { nombre } });

    if (restaurante) {
      await restaurante.update(req.body);
      res.json(restaurante);
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    res.status(500).json({ error: 'Error al actualizar el restaurante' });
  }
});

//-----------
//DELETE
// Ruta para eliminar un restaurante por su ID
app.delete('/restaurantes/:id', async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id);
    if (restaurante) {
      await restaurante.destroy();
      res.json({ message: 'Restaurante eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el restaurante:', error);
    res.status(500).json({ error: 'Error al eliminar el restaurante' });
  }
});

// Ruta para eliminar un restaurante por su nombre
app.delete('/restaurantes', async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ error: 'Debes proporcionar el nombre del restaurante' });
    }

    const restaurante = await Restaurante.findOne({ where: { nombre } });

    if (restaurante) {
      await restaurante.destroy();
      res.json({ message: 'Restaurante eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el restaurante:', error);
    res.status(500).json({ error: 'Error al eliminar el restaurante' });
  }
});

//-----------
// RESTAURANTES
//-----------
// POST
const Reserva = require('./reserva'); // Importa el modelo Reserva

// Ruta para crear una nueva reserva (POST /reservas)
app.post('/reservas', async (req, res) => {
  try {
    const nuevaReserva = await Reserva.create(req.body);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Ruta para obtener una reserva por su ID (GET /reservas/:id)
app.get('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (reserva) {
      res.json(reserva);
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al buscar la reserva:', error);
    res.status(500).json({ error: 'Error al buscar la reserva' });
  }
});

// Ruta para obtener todas las reservas de un restaurante (GET /restaurantes/:id/reservas)
app.get('/restaurantes/:id/reservas', async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id);
    if (restaurante) {
      const reservas = await restaurante.getReservas();
      res.json(reservas);
    } else {
      res.status(404).json({ error: 'Restaurante no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar las reservas:', error);
    res.status(500).json({ error: 'Error al buscar las reservas' });
  }
});

// Ruta para actualizar una reserva (PUT /reservas/:id)
app.put('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.update(req.body);
      res.json(reserva);
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
});

// Ruta para cancelar una reserva (DELETE /reservas/:id)
app.delete('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.destroy();
      res.json({ message: 'Reserva cancelada correctamente' });
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    res.status(500).json({ error: 'Error al cancelar la reserva' });
  }
});


app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});