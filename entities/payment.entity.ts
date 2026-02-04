import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: "varchar", default: "USD", length: 3 })
  currency!: string;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({
    name: "transaction_id",
    type: "varchar",
    nullable: true,
    unique: true,
  })
  transaction_id!: string;

  @Column({ name: "payout_method", type: "varchar", nullable: true })
  payout_method!: string;

  @ManyToOne("User", { onDelete: "CASCADE" })
  @JoinColumn({ name: "writer_id" })
  @Index()
  writer!: any;

  @Column({ name: "writer_id" })
  writer_id!: string;

  @CreateDateColumn({ name: "processed_at", nullable: true })
  processed_at!: Date;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
