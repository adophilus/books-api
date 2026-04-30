import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/user.entity";
import { Book } from "../../book/entities/book.entity";
import { Video } from "../../video/entities/video.entity";

@Entity()
export class Author {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@ManyToOne(() => User, { eager: false })
	@JoinColumn({ name: "user_id" })
	user: User;

	@OneToMany(() => Book, (book) => book.author)
	books: Book[];

	@OneToMany(() => Video, (video) => video.author)
	videos: Video[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
