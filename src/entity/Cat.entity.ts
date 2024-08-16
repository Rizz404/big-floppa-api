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
import { Order } from "./Order.entity";

export enum CatStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  ADOPTED = "ADOPTED",
}

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ nullable: true })
  name?: string;

  @Column({ type: "smallint" })
  age: number;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "enum", enum: CatStatus, default: CatStatus.AVAILABLE })
  status: CatStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cats)
  user: User;

  @OneToMany(() => CatPicture, (catPicture) => catPicture.cat)
  catPictures: CatPicture[];

  @ManyToOne(() => CatBreed, (catBreed) => catBreed.cats)
  catBreed: CatBreed;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cat)
  cartItems: CartItem[];

  @OneToMany(() => Order, (order) => order.cat)
  orders: Order[];
}
