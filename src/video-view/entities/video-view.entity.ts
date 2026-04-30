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
export class VideoView {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Video, (video) => video.views)
	@JoinColumn({ name: "video_id" })
	video: Video;

	@ManyToOne(() => Author)
	@JoinColumn({ name: "author_id" })
	author: Author;

	@Column({ name: "viewed_at", type: "datetime" })
	@CreateDateColumn()
	viewedAt: Date;
}
