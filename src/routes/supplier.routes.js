const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplier.controller');
const validate = require('../middlewares/validate.middleware');
const { supplierSchema } = require('../validators/supplier.validator');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth(), SupplierController.getAllSuppliers);
router.get('/:id', auth(), SupplierController.getSupplierById);
router.post('/', auth('admin'), validate(supplierSchema), SupplierController.createSupplier);
router.put('/:id', auth('admin'), validate(supplierSchema), SupplierController.updateSupplier);
router.delete('/:id', auth('admin'), SupplierController.deleteSupplier);

module.exports = router;
