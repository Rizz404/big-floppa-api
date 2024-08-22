import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";

export enum NotificationType {
  ORDER_CREATED = "ORDER_CREATED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  ORDER_SHIPPED = "ORDER_SHIPPED",
  ORDER_DELIVERED = "ORDER_DELIVERED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  ORDER_RETURNED = "ORDER_RETURNED",
  NEW_CAT = "NEW_CAT",
  NEW_BREED = "NEW_BREED",
  FLASH_SALE = "FLASH_SALE",
  DISCOUNT_AVAILABLE = "DISCOUNT_AVAILABLE",
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: NotificationType })
  type: NotificationType;

  @Column({ type: "varchar" })
  message: string;

  @Column({ type: "varchar", nullable: true })
  link?: string;

  @Column({ type: "bool", default: false })
  isGlobal: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.notifications)
  @JoinTable()
  users: User[];
}
