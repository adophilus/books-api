import * as Joi from "joi";

export const CreateBookCommentSchema = Joi.object({
	bookId: Joi.string().required(),
	authorId: Joi.string().required(),
	content: Joi.string().trim().required(),
});

export const UpdateBookCommentSchema = Joi.object({
	content: Joi.string().trim().optional(),
});

export const FilterBookCommentSchema = Joi.object({
	bookId: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
