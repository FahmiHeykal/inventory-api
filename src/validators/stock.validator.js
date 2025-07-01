const Joi = require('joi');

const stockSchema = Joi.object({
  product_id: Joi.number().required(),
  type: Joi.string().valid('IN', 'OUT').required(),
  quantity: Joi.number().integer().min(1).required(),
  note: Joi.string().allow('').optional()
});

module.exports = { stockSchema };
