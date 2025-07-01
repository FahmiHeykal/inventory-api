const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  supplier_id: Joi.number().required(),
  stock: Joi.number().integer().min(0).required()
});

module.exports = { productSchema };
