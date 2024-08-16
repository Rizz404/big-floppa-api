import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Order } from "./Order.entity";
import { Payment } from "./Payment.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal" })
  fee: number;

  @Column({ type: "decimal" })
  subTotal: number;

  @Column({ type: "decimal" })
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

  @ManyToOne(() => Payment, (payment) => payment.transactions)
  payment: Payment;

  @OneToMany(() => Order, (order) => order.transaction)
  orders: Order;
}
