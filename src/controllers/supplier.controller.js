const SupplierService = require('../services/supplier.service');

const createSupplier = async (req, res, next) => {
  try {
    const data = await SupplierService.create(req.body);
    res.status(201).json({ message: 'Supplier ditambahkan', data });
  } catch (err) {
    next(err);
  }
};

const getAllSuppliers = async (req, res, next) => {
  try {
    const data = await SupplierService.getAll();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const getSupplierById = async (req, res, next) => {
  try {
    const data = await SupplierService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Supplier tidak ditemukan' });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const data = await SupplierService.update(req.params.id, req.body);
    res.json({ message: 'Supplier diperbarui', data });
  } catch (err) {
    next(err);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    await SupplierService.remove(req.params.id);
    res.json({ message: 'Supplier dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};
