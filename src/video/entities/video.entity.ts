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
import { VideoView } from "../../video-view/entities/video-view.entity";
import { VideoComment } from "../../video-comment/entities/video-comment.entity";

@Entity()
export class Video {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ type: "text" })
	description: string;

	@Column()
	url: string;

	@ManyToOne(() => Author, (author) => author.videos)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@OneToMany(() => VideoView, (view) => view.video)
	views: VideoView[];

	@OneToMany(() => VideoComment, (comment) => comment.video)
	comments: VideoComment[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
