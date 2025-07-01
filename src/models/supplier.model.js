const db = require('../config/db');

const createSupplier = async ({ name, contact, address }) => {
  const result = await db.query(
    `INSERT INTO suppliers (name, contact, address)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, contact, address]
  );
  return result.rows[0];
};

const getAllSuppliers = async () => {
  const result = await db.query(`SELECT * FROM suppliers ORDER BY id DESC`);
  return result.rows;
};

const getSupplierById = async (id) => {
  const result = await db.query(`SELECT * FROM suppliers WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateSupplier = async (id, data) => {
  const result = await db.query(
    `UPDATE suppliers SET name = $1, contact = $2, address = $3 WHERE id = $4 RETURNING *`,
    [data.name, data.contact, data.address, id]
  );
  return result.rows[0];
};

const deleteSupplier = async (id) => {
  await db.query(`DELETE FROM suppliers WHERE id = $1`, [id]);
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};
