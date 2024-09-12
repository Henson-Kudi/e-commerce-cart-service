import Joi from 'joi';

// Define how data will be transfered
export const CreateCartItemSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  quantity: Joi.number().required().positive().min(1),
});

export const CreateWishlistItemSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});
