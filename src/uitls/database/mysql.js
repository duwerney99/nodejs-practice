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


const getConnection = async () => {
    return pool;
};

module.exports = {
    getConnection
};
