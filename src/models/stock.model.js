const db = require('../config/db');

const insertStockTransaction = async ({ product_id, type, quantity, note }) => {
  const result = await db.query(
    `INSERT INTO stock_transactions (product_id, type, quantity, note)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [product_id, type, quantity, note]
  );
  return result.rows[0];
};

const getTransactionsByProduct = async (product_id) => {
  const result = await db.query(
    `SELECT * FROM stock_transactions WHERE product_id = $1 ORDER BY created_at DESC`,
    [product_id]
  );
  return result.rows;
};

module.exports = {
  insertStockTransaction,
  getTransactionsByProduct
};
