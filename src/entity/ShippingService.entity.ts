import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem.entity";
import { Transform } from "class-transformer";
import { ColumnNumericTransformer } from "../utils/columnNumericTransformer";

@Entity()
export class ShippingService {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "decimal",
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  fee: number;

  @Column({ type: "varchar" })
  estimationTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.shippingService)
  orderItems: OrderItem[];
}
