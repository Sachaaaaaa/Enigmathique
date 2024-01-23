const Joi = require('joi');

const baseSchema = Joi.object({
}).messages({
  'string.base': '{#label} doit être une chaîne de caractères',
  'string.alphanum': '{#label} doit contenir uniquement des caractères alphanumériques',
  'string.min': '{#label} doit avoir au moins {#limit} caractères',
  'string.max': '{#label} ne peut pas dépasser {#limit} caractères',
  'string.email': '{#label} doit être un email valide',
  'any.required': 'La valeur {#label} est requise',
  'object.unknown': '{#label} contient une propriété inattendue',
});

module.exports = {
  baseSchema,
};
