const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const stockRoutes = require('./stock.routes');
const supplierRoutes = require('./supplier.routes');
const exportController = require('../controllers/export.controller');
const exportRoutes = require('./export.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/stocks', stockRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/export', exportRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/export/products/pdf', exportController.exportProductsPDF);
router.get('/export/products/csv', exportController.exportProductsCSV);

module.exports = router;
