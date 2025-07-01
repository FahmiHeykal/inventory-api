const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const validate = require('../middlewares/validate.middleware');
const { productSchema } = require('../validators/product.validator');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth(), ProductController.getAllProducts);
router.get('/:id', auth(), ProductController.getProductById);
router.post('/', auth('admin'), validate(productSchema), ProductController.createProduct);
router.put('/:id', auth('admin'), validate(productSchema), ProductController.updateProduct);
router.delete('/:id', auth('admin'), ProductController.deleteProduct);

module.exports = router;
