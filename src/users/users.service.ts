import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './user.entity'
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

	async create(payload: Omit<User, 'id'>): Promise<User> {
		const user = this.userRepository.create(payload)
		return await this.userRepository.save(user)
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneBy({ email });
	}
}
