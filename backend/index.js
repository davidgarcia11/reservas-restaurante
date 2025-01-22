const express = require('express');
const { Op } = require("sequelize");
const app = express();
const port = 3000;
const Restaurante = require('./restaurante'); // Importa el modelo Restaurante

// Middleware para procesar datos en formato JSON
app.use(express.json());

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


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});