const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema para el modelo de usuarios
const usuarioSchema = new mongoose.Schema({
    email: String,
    password: String
});

  // Crear el modelo de usuarios
const Usuario = mongoose.model('Usuario', usuarioSchema);



// Configurar el middleware para manejar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar la petición POST para el registro de usuarios
app.post('/registro', function(req, res) {
  // Crear un nuevo usuario utilizando los datos del formulario
  const nuevoUsuario = new Usuario({
    email: req.body.email,
    password: req.body.password
  });

  // Guardar el nuevo usuario en la base de datos
  nuevoUsuario.save(function(err) {
    if (err) {
      // Manejar los errores de la base de datos
      console.log(err);
      res.send('Error al registrar el usuario');
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      res.redirect('/login');
    }
  });
});


const app = express();
const fs = require('fs');
const path = require('path');




const PORT = 3000;

app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/admin.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/carrito.html'));
});

app.get('/stores', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/sucursales.html'));
});

app.get('/user/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/views/pages/perfil.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
