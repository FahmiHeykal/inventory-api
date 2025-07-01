const ProductService = require('../services/product.service');

const createProduct = async (req, res, next) => {
  try {
    const data = await ProductService.create(req.body);
    res.status(201).json({ message: 'Produk ditambahkan', data });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const data = await ProductService.getAll(req.query);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const data = await ProductService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const data = await ProductService.update(req.params.id, req.body);
    res.json({ message: 'Produk diperbarui', data });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.remove(req.params.id);
    res.json({ message: 'Produk dihapus (soft delete)' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
