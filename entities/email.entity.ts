import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "email", type: "varchar", unique: true })
  email!: string;

  @Column({ name: "is_subscribed", type: "boolean", default: true })
  is_subscribed!: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
