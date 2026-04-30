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
export class BookView {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Book, (book) => book.views)
	@JoinColumn({ name: "book_id" })
	book: Book;

	@ManyToOne(() => Author)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@Column({ name: "viewed_at", type: "datetime" })
	@CreateDateColumn()
	viewedAt: Date;
}
