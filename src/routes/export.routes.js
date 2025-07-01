const express = require('express');
const router = express.Router();
const exportController = require('../controllers/export.controller');

router.get('/products/pdf', exportController.exportProductsPDF);
router.get('/products/csv', exportController.exportProductsCSV);

router.get('/suppliers/pdf', exportController.exportSuppliersPDF);
router.get('/suppliers/csv', exportController.exportSuppliersCSV);

router.get('/stocks/pdf', exportController.exportStocksPDF);
router.get('/stocks/csv', exportController.exportStocksCSV);

module.exports = router;
