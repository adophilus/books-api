import { IsInt } from "class-validator";

export class CreateBookViewDto {
	@IsInt()
	author_id: number;
}
