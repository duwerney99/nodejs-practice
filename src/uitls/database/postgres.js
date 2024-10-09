const { Pool } = require('pg');  
require('dotenv').config();      

// Crear un pool de conexiones
const pool = new Pool({
    host: '34.173.13.198',
    user: 'postgres',
    password: '12345',
    database: 'tecniTest',
    port: '5432'
});


const getConnection = async () => {
    try {
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

module.exports = {
    getConnection
};
