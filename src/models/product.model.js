const db = require('../config/db');

const createProduct = async ({ name, category, supplier_id, stock }) => {
  const result = await db.query(
    `INSERT INTO products (name, category, supplier_id, stock)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, category, supplier_id, stock]
  );
  return result.rows[0];
};

const findAllProducts = async ({ search, category, supplier_id, page, limit }) => {
  let query = `SELECT * FROM products WHERE is_deleted = FALSE`;
  const values = [];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  if (supplier_id) {
    values.push(supplier_id);
    query += ` AND supplier_id = $${values.length}`;
  }

  query += ` ORDER BY id DESC`;

  if (page && limit) {
    const offset = (page - 1) * limit;
    values.push(limit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
  }

  const result = await db.query(query, values);
  return result.rows;
};

const findProductById = async (id) => {
  const result = await db.query(`SELECT * FROM products WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateProduct = async (id, data) => {
  const result = await db.query(
    `UPDATE products SET name = $1, category = $2, supplier_id = $3, stock = $4
     WHERE id = $5 RETURNING *`,
    [data.name, data.category, data.supplier_id, data.stock, id]
  );
  return result.rows[0];
};

const softDeleteProduct = async (id) => {
  await db.query(`UPDATE products SET is_deleted = TRUE WHERE id = $1`, [id]);
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  softDeleteProduct
};
