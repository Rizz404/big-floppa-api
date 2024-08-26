import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Order } from "./Order.entity";
import { PaymentMethod } from "./PaymentMethod.entity";

import { Transform } from "class-transformer";
import { ColumnNumericTransformer } from "../utils/columnNumericTransformer";

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", default: 0 })
  adminFee: number;

  @Column({ type: "decimal", default: 0 })
  paymentMethodFee: number;

  @Column({ type: "decimal", default: 0 })
  shippingServiceFee: number;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: "decimal",
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  subTotal: number;

  @Column({
    type: "decimal",
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @CreateDateColumn()
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.buyerTransactions)
  buyer: User;

  @ManyToOne(() => User, (user) => user.sellerTransactions)
  seller: User;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.transactions)
  paymentMethod: PaymentMethod;

  @OneToMany(() => Order, (order) => order.transaction)
  orders: Order;
}
