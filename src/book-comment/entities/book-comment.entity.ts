import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "../../book/entities/book.entity";
import { Author } from "../../author/entities/author.entity";

@Entity()
export class BookComment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Book, (book) => book.comments)
	@JoinColumn({ name: "book_id" })
	book: Book;

	@ManyToOne(() => Author)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@Column({ type: "text" })
	content: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
