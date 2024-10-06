const { Pool } = require('pg');  
require('dotenv').config();      

// Crear un pool de conexiones
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
});

// Función para obtener una conexión
const getConnection = async () => {
    try {
        const client = await pool.connect();  // Conectar a la base de datos
        console.log('Conectado a la base de datos PostgreSQL');  // Mostrar mensaje de éxito
        return client;
    } catch (err) {
        console.error('Error al conectarse a la base de datos:', err.message);  // Mostrar mensaje de error
        throw err;  // Lanza el error para manejarlo más tarde
    }
};

module.exports = {
    getConnection
};
