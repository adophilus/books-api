import {
	PipeTransform,
	Injectable,
	BadRequestException,
} from "@nestjs/common";
import * as Joi from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(private readonly schema: Joi.ObjectSchema) {}

	transform(value: any) {
		const { error, value: validated } = this.schema.validate(value, {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			const messages = error.details.map((d) => d.message).join("; ");
			throw new BadRequestException(messages);
		}

		return validated;
	}
}
