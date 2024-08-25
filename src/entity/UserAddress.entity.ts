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

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean" })
  isPrimaryAddress: boolean;

  @Column({ type: "varchar" })
  country: string;

  @Column({ type: "varchar" })
  province: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar" })
  district: string;

  @Column({ type: "varchar" })
  village: string;

  @Column({ type: "text" })
  fullAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.userAddress)
  orders: Order[];

  @ManyToOne(() => User, (user) => user.userAddreses)
  user: User;
}
