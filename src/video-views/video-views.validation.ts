import * as Joi from "joi";

export const CreateVideoViewSchema = Joi.object({
	videoId: Joi.string().required(),
	authorId: Joi.string().required(),
});

export const UpdateVideoViewSchema = Joi.object({});

export const FilterVideoViewSchema = Joi.object({
	videoId: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
