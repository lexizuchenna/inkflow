import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

export enum StoryStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

@Entity({ name: "stories" })
export class Story {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 255 })
  category!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  @Index()
  slug!: string;

  @Column({ type: "text", nullable: true })
  excerpt!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ name: "featured_image", type: "text", nullable: true })
  featured_image!: string;

  @Column({
    type: "enum",
    enum: StoryStatus,
    default: StoryStatus.DRAFT,
  })
  status!: StoryStatus;

  @Column({ name: "view_count", type: "int", default: 0 })
  view_count!: number;

  @Column({ name: "like_count", type: "int", default: 0 })
  like_count!: number;

  @Column({ name: "reading_time", type: "int", default: 0 })
  reading_time!: number;

  @Column({
    name: "completion_rate",
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  completion_rate!: number;

  @ManyToOne("User", "stories", { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author!: any;

  @Column({ name: "author_id" })
  author_id!: string;

  @ManyToOne("Series", "stories", {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "series_id" })
  series!: any;

  @Column({ name: "series_id", nullable: true })
  series_id!: string;

  @Column({ name: "order_in_series", type: "int", nullable: true })
  order_in_series!: number;

  @Column({ type: "jsonb", nullable: true })
  tags!: string[];

  @Column({ name: "is_featured", type: "boolean", default: false })
  is_featured!: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;
}
