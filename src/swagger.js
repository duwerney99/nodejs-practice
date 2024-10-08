const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación Técnica",
      version: "1.0.0",
      description: 'API Documentation',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ["src/routes/UsersRoutes.js"],
};
 
 
  
const swaggerSpec = swaggerJSdoc(options);
 
const swaggerDocs = (app, port) => {
    app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/documentation.json', (req,res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log( `Documentacion disponible en http://localhost:${port}/api/documentation`)
}
 
module.exports = {
    swaggerDocs
};