import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Author } from "../../author/entities/author.entity";
import { BookView } from "../../book-view/entities/book-view.entity";
import { BookComment } from "../../book-comment/entities/book-comment.entity";

@Entity()
export class Book {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ type: "text" })
	description: string;

	@ManyToOne(() => Author, (author) => author.books)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@OneToMany(() => BookView, (view) => view.book)
	views: BookView[];

	@OneToMany(() => BookComment, (comment) => comment.book)
	comments: BookComment[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
