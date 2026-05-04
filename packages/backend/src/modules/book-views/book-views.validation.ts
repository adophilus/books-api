import * as Joi from "joi";

export const CreateBookViewSchema = Joi.object({
	bookId: Joi.string().required(),
	authorId: Joi.string().required(),
});

export const UpdateBookViewSchema = Joi.object({});

export const FilterBookViewSchema = Joi.object({
	bookId: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
