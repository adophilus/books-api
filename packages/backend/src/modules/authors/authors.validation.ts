import * as Joi from "joi";

export const CreateAuthorSchema = Joi.object({
	name: Joi.string().trim().required(),
	email: Joi.string().email().required(),
});

export const UpdateAuthorSchema = Joi.object({
	name: Joi.string().trim().optional(),
	email: Joi.string().email().optional(),
});

export const FilterAuthorSchema = Joi.object({
	search: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
