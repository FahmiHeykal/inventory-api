const Product = require('../models/product.model');
const db = require('../config/db');

const create = async (data) => {
  return await Product.createProduct(data);
};

const getAll = async (filters) => {
  return await Product.findAllProducts(filters);
};

const getById = async (id) => {
  return await Product.findProductById(id);
};

const update = async (id, data) => {
  return await Product.updateProduct(id, data);
};

const remove = async (id) => {
  return await Product.softDeleteProduct(id);
};

const getAllProducts = async () => {
  const result = await db.query(`SELECT * FROM products WHERE is_deleted = FALSE`);
  return result.rows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getAllProducts
};
