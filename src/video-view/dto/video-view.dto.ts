import { IsInt } from "class-validator";

export class CreateVideoViewDto {
	@IsInt()
	author_id: number;
}
