const db = require('../config/db');

const getSummary = async () => {
  const [
    totalProducts,
    totalSuppliers,
    totalTransactions,
    lowStockProducts
  ] = await Promise.all([
    db.query(`SELECT COUNT(*) FROM products WHERE is_deleted = FALSE`),
    db.query(`SELECT COUNT(*) FROM suppliers`),
    db.query(`SELECT COUNT(*) FROM stocks`),
    db.query(`SELECT COUNT(*) FROM products WHERE stock < 10 AND is_deleted = FALSE`)
  ]);

  return {
    total_products: parseInt(totalProducts.rows[0].count),
    total_suppliers: parseInt(totalSuppliers.rows[0].count),
    total_transactions: parseInt(totalTransactions.rows[0].count),
    low_stock_products: parseInt(lowStockProducts.rows[0].count)
  };
};

module.exports = {
  getSummary,
};
