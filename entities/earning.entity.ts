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

export enum EarningSource {
  ARTICLE = "article",
  ADS = "ads",
  TIP = "tip",
  PRO_REFERRAL = "pro_referral",
}

@Entity("earnings")
export class Earning {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amount!: number;

  @Column({ type: "varchar", default: "USD", length: 3 })
  currency!: string;

  @Column({
    type: "enum",
    enum: EarningSource,
    default: EarningSource.ARTICLE,
  })
  source!: EarningSource;

  @Column({ name: "is_settled", type: "boolean", default: false })
  @Index()
  is_settled!: boolean;

  @ManyToOne("User", { onDelete: "CASCADE" })
  @JoinColumn({ name: "writer_id" })
  @Index()
  writer!: any;

  @Column({ name: "writer_id" })
  writer_id!: string;

  @ManyToOne("Story", { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "story_id" })
  @Index()
  story!: any;

  @Column({ name: "story_id", nullable: true })
  story_id!: string;

  @Column({ type: "jsonb", nullable: true })
  metadata!: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;
}
