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

export enum OrderStatus {
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

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PACKAGING })
  status: OrderStatus;

  @Column({ type: "int", default: 1 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Cat, (cat) => cat.orders)
  cat: Cat;

  @ManyToOne(() => ShippingService, (shippingService) => shippingService.orders)
  shippingService: ShippingService;

  @ManyToOne(() => Transaction, (transaction) => transaction.orders)
  transaction: Transaction;
}
