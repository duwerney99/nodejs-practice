require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { getConnection } = require('./uitls/database/postgres');
const { swaggerDocs } = require('./uitls/swagger')

const UsersRouter = require('../src/routes/UsersRoutes')

const app = express();                                              

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.json());

app.use("/api/users", UsersRouter);

app.use(cors());


const startServer = async () => {
    try {
        await getConnection();  // Verificar la conexión antes de iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
            swaggerDocs(app, PORT)
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}

startServer()

