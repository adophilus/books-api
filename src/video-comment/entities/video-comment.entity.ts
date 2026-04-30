import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { Author } from "../../author/entities/author.entity";

@Entity()
export class VideoComment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Video, (video) => video.comments)
	@JoinColumn({ name: "video_id" })
	video: Video;

	@ManyToOne(() => Author)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@Column({ type: "text" })
	content: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
