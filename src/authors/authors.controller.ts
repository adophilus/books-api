import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
} from "@nestjs/common";
import { JoiValidationPipe } from "../pipes/JoiValidatorPipe";
import { AuthorsService } from "./authors.service";
import {
	CreateAuthorDto,
	UpdateAuthorDto,
	FilterAuthorDto,
} from "./authors.types";
import {
	CreateAuthorSchema,
	UpdateAuthorSchema,
	FilterAuthorSchema,
} from "./authors.validation";

@Controller("authors")
export class AuthorsController {
	constructor(private readonly service: AuthorsService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateAuthorSchema))
	create(@Body() dto: CreateAuthorDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterAuthorSchema))
	selectMany(@Query() filter: FilterAuthorDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateAuthorSchema))
	update(@Param("id") id: string, @Body() body: UpdateAuthorDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
