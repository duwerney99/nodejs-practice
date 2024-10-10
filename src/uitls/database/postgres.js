const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: '34.173.13.198',
    user: 'postgres',
    password: '12345',
    database: 'tecniTest',
    port: 5432
});

const getConnection = async () => {
    try {
        console.log('Conectando a la base de datos...');
        const client = await pool.connect();
        console.log('Conexión establecida');
        return client;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

module.exports = {
    getConnection
};
