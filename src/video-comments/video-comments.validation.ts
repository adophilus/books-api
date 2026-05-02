import * as Joi from "joi";

export const CreateVideoCommentSchema = Joi.object({
	videoId: Joi.string().required(),
	authorId: Joi.string().required(),
	content: Joi.string().trim().required(),
});

export const UpdateVideoCommentSchema = Joi.object({
	content: Joi.string().trim().optional(),
});

export const FilterVideoCommentSchema = Joi.object({
	videoId: Joi.string().optional(),
	authorId: Joi.string().optional(),
	page: Joi.number().min(1).optional(),
	limit: Joi.number().min(1).max(100).optional(),
});
