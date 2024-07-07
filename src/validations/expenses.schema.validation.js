import Joi from 'joi';

const schema = Joi.object({
  ownerUserId: Joi.number().min(1).required(),
  groupId: Joi.number().min(1).required(),
  description: Joi.string().trim().min(1).max(300).required(),
  total: Joi.number().min(1).required(),
});

export default schema;
