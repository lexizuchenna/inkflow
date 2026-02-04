import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "./user.entity";
import { Story } from "./story.entity";

@Entity("series")
export class Series {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  @Index()
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ name: "cover_image", type: "text", nullable: true })
  cover_image!: string;

  @Column({ name: "is_completed", type: "boolean", default: false })
  is_completed!: boolean;

  // ANALYTICS
  @Column({ name: "view_count", type: "int", default: 0 })
  view_count!: number;

  // RELATIONSHIPS
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author!: User;

  @Column({ name: "author_id" })
  author_id!: string;

  @OneToMany(() => Story, (story) => story.series)
  stories!: Story[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;
}
