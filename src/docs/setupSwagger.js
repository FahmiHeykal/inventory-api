const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('📚 Swagger Docs tersedia di http://localhost:3000/api/docs');
};

module.exports = setupSwagger;
