import * as Joi from "joi";

export const CreateBookSchema = Joi.object({
	title: Joi.string().trim().required(),
	description: Joi.string().allow("", null).optional(),
	authorId: Joi.string().required(),
});

export const UpdateBookSchema = Joi.object({
	title: Joi.string().trim().optional(),
	description: Joi.string().allow("", null).optional(),
});

export const FilterBookSchema = Joi.object({
	search: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
