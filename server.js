// Backend básico para conectar formulario a MongoDB Atlas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://root123:root123@cluster0.0s6q0vr.mongodb.net/formulario?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión:', err));

// Esquema y modelo de ejemplo
const FormSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});
const Form = mongoose.model('Form', FormSchema);

// Ruta para recibir datos del formulario
app.post('/api/guardar', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoForm = new Form({ nombre, email, password });
    await nuevoForm.save();
    res.status(201).json({ message: 'Datos guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar en DB:', error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});

// Iniciar servidor local o exportar app para Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
}

module.exports = app;
