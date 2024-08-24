import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ShippingService } from "./ShippingService.entity";
import { Cat } from "./Cat.entity";
import { Order } from "./Order.entity";

export enum OrderItemStatus {
  PENDING = "PENDING",
  PACKAGING = "PACKAGING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RECEIVED = "RECEIVED",
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Cat, (cat) => cat.orderItems)
  cat: Cat;

  @Column({
    type: "enum",
    enum: OrderItemStatus,
    default: OrderItemStatus.PACKAGING,
  })
  status: OrderItemStatus;

  @Column({ type: "int", default: 1 })
  amount: number;

  @Column({ type: "decimal" })
  price: number;

  @ManyToOne(
    () => ShippingService,
    (shippingService) => shippingService.orderItems
  )
  shippingService: ShippingService;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
