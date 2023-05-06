const express = require('express');
const app = express();
const port = 3005;
const cors = require('cors');
const mysql = require('mysql');


// Configuración para manejar JSON en las peticiones POST
app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'udgcreativa'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos: ', error);
    } else {
        console.log('Conexión a la base de datos establecida');
    }
});

// Ruta POST para manejar el envío del formulario
app.post('/form', (req, res) => {
    // Recupera los datos enviados en el cuerpo de la petición
    const { nombre, email, titulo, mensaje } = req.body;

    // Imprime los datos recibidos en la consola del servidor
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);
    console.log(`Asunto: ${titulo}`);
    console.log(`Mensaje: ${mensaje}`);

    // Aquí puedes agregar código para insertar los datos en la base de datos

    const sql = `INSERT INTO usuarios (nombre, email, titulo, mensaje) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [nombre, email, titulo, mensaje], (error, results) => {
        if (error) throw error;
        console.log(results);
    });

    // Envía una respuesta de éxito al cliente
    res.sendStatus(200);
})


// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
