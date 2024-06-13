const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Conectar a la base de datos de MongoDB
mongoose.connect("mongodb://localhost:27017/usuariosDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Crear un modelo de usuario
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para el registro de usuarios
app.post('/register', (req, res) => {
    const nuevoUsuario = new Usuario({
        username: req.body.username,
        password: req.body.password
    });

    nuevoUsuario.save((err) => {
        if (err) {
            console.log(err);
            res.send("Error al registrar usuario.");
        } else {
            res.send("Usuario registrado exitosamente.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});