import * as Joi from "joi";

export const CreateVideoSchema = Joi.object({
	title: Joi.string().trim().required(),
	description: Joi.string().allow("", null).optional(),
	url: Joi.string().uri().required(),
	authorId: Joi.string().required(),
});

export const UpdateVideoSchema = Joi.object({
	title: Joi.string().trim().optional(),
	description: Joi.string().allow("", null).optional(),
	url: Joi.string().uri().optional(),
});

export const FilterVideoSchema = Joi.object({
	search: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
