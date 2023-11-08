const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const databaseConnect = require('../database/database');

// Rutas
const userRoutes = require('./routes/user.routes');

// Middlewares para cliente
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Uso de rutas

databaseConnect();

app.listen(process.env.PORT, () =>
  console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`)
);
