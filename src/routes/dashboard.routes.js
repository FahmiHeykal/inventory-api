const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/summary', auth(), dashboardController.getSummary);

module.exports = router;
