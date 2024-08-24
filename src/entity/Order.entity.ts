import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { ShippingService } from "./ShippingService.entity";
import { Transaction } from "./Transaction.entity";
import { Cat } from "./Cat.entity";
import { OrderItem } from "./OrderItem.entity";

export enum OrderStatus {
  PENDING = "PENDING",
  PACKAGING = "PACKAGING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RECEIVED = "RECEIVED",
}

// ? Harusnya order status dan shipping service ada di order item kan

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.orders)
  transaction: Transaction;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
