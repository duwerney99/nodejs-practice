require('dotenv').config();
const express = require("express");
const { getConnection } = require('../src/uitls/database/mysql');




const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use(express.json());

// app.use("/api/usuarios", UsuarioRouter);


const startServer = async () => {
    try {
        await getConnection();  // Verificar la conexión antes de iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}

