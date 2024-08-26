import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction.entity";
import { Transform } from "class-transformer";
import { ColumnNumericTransformer } from "../utils/columnNumericTransformer";

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "decimal",
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  paymentFee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.paymentMethod)
  transactions: Transaction[];
}
