require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { getConnection } = require('./uitls/database/postgres');
const { swaggerDocs } = require('./uitls/swagger')

const UsersRouter = require('../src/routes/UsersRoutes')

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", UsersRouter);

const startServer = async () => {
    try {
        await getConnection();
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
            swaggerDocs(app, PORT);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
};

startServer();


