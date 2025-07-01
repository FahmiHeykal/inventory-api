const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stock.controller');
const validate = require('../middlewares/validate.middleware');
const { stockSchema } = require('../validators/stock.validator');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth('admin'), validate(stockSchema), StockController.addTransaction);

router.get('/:product_id', auth(), StockController.getHistory);

module.exports = router;
