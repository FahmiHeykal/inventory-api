const db = require('../config/db');
const Product = require('../models/product.model');
const Stock = require('../models/stock.model');

const addTransaction = async ({ product_id, type, quantity, note }) => {
  const product = await Product.findProductById(product_id);
  if (!product) throw new Error('Produk tidak ditemukan');

  let newStock = product.stock;

  if (type === 'IN') {
    newStock += quantity;
  } else if (type === 'OUT') {
    if (quantity > product.stock) {
      throw new Error('Stok tidak mencukupi untuk dikeluarkan');
    }
    newStock -= quantity;
  }

  await Product.updateProduct(product_id, {
    name: product.name,
    category: product.category,
    supplier_id: product.supplier_id,
    stock: newStock
  });

  return await Stock.insertStockTransaction({ product_id, type, quantity, note });
};

const getHistory = async (product_id) => {
  return await Stock.getTransactionsByProduct(product_id);
};

module.exports = {
  addTransaction,
  getHistory
};
