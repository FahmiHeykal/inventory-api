const Joi = require('joi');

const supplierSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.string().allow('').optional(),
  address: Joi.string().allow('').optional()
});

module.exports = { supplierSchema };
