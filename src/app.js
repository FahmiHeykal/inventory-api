const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');
const setupSwagger = require('./docs/setupSwagger');
const { startLowStockJob } = require('./jobs/lowStockAlert.job');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Inventory API is running!');
});

startLowStockJob();
setupSwagger(app);

module.exports = app;
