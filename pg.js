// Requerimos la librería 'pg'
const { Client } = require('pg');

// Cargamos las variables de entorno
require('dotenv').config();

// Creamos una instancia del cliente de PostgreSQL con las credenciales de la base de datos
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Conectamos al cliente con la base de datos
client.connect(err => {
  if (err) {
    console.error('Error de conexión', err.stack);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Realizamos una consulta (este es solo un ejemplo, deberías cambiar la consulta por una que necesites)
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
  // No olvides cerrar la conexión cuando hayas terminado
  client.end();
});
