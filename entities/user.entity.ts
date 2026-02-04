import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  WRITER = "writer",
  READER = "reader",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "clerk_id", type: "varchar", unique: true })
  clerk_id!: string;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.WRITER,
  })
  role!: UserRole;

  @Column({ type: "varchar", nullable: true })
  display_name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ name: "avatar_url", type: "text", nullable: true })
  avatar_url?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ name: "is_pro", type: "boolean", default: false })
  is_pro!: boolean;

  @Column({ name: "follower_count", type: "int", default: 0 })
  follower_count!: number;

  @Column({ name: "following_count", type: "int", default: 0 })
  following_count!: number;

  @OneToMany("Story", "author")
  stories!: any[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;
}
