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
import { Gender } from "./Profile.entity";
import { User } from "./User.entity";
import { CatPicture } from "./CatPicture.entity";
import { CatBreed } from "./CatBreed.entity";
import { CartItem } from "./CartItem.entity";
import { OrderItem } from "./OrderItem.entity";
import { Transform } from "class-transformer";
import { ColumnNumericTransformer } from "../utils/columnNumericTransformer";

export enum CatStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  ADOPTED = "ADOPTED",
}

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.cats)
  user: User;

  @ManyToOne(() => CatBreed, (catBreed) => catBreed.cats, { cascade: true })
  catBreed: CatBreed;

  @Index()
  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "smallint" })
  age: number;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "decimal",
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "enum", enum: CatStatus, default: CatStatus.AVAILABLE })
  status: CatStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CatPicture, (catPicture) => catPicture.cat, {
    cascade: true,
  })
  catPictures: CatPicture[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.cat)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.cat)
  orderItems: OrderItem[];
}
