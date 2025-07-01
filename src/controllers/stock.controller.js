const InventoryService = require('../services/inventory.service');

const addTransaction = async (req, res, next) => {
  try {
    const data = await InventoryService.addTransaction(req.body);
    res.status(201).json({ message: 'Transaksi stok berhasil', data });
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const data = await InventoryService.getHistory(req.params.product_id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTransaction,
  getHistory
};
