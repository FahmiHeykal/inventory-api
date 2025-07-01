const Supplier = require('../models/supplier.model');

const create = async (data) => {
  return await Supplier.createSupplier(data);
};

const getAll = async () => {
  return await Supplier.getAllSuppliers();
};

const getById = async (id) => {
  return await Supplier.getSupplierById(id);
};

const update = async (id, data) => {
  return await Supplier.updateSupplier(id, data);
};

const remove = async (id) => {
  return await Supplier.deleteSupplier(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
