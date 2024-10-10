const { Pool } = require('pg');  
require('dotenv').config();      



const pool = new Pool({
    host: 'my-nodejs-app-438001:us-central1:tecni-test',
    user: 'postgres',
    password: '12345',
    database: 'tecniTest',
    port: '5432'
    // host: 'localhost',
    // user: 'postgres',
    // password: '12345',
    // database: 'tecniTest',
    // port: '5432'
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


 