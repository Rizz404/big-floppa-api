import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Transaction } from "./Transaction.entity";
import { OrderItem } from "./OrderItem.entity";
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.orders, {
    cascade: true,
  })
  transaction: Transaction;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.orders, {
    cascade: true,
  })
  userAddress: UserAddress;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
