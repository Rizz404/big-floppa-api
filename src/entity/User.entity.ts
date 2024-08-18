import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile.entity";
import { Cat } from "./Cat.entity";
import { CatBreed } from "./CatBreed.entity";
import { UserAddress } from "./UserAddress.entity";
import { Cart } from "./Cart.entity";
import { Transaction } from "./Transaction.entity";
import { Order } from "./Order.entity";

// * Urutannya migration:generate terus migration:run terus migration:create

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  oauthId?: string;

  // * Kalau ada index dan true bersamaan usahakan di decorator saja
  @Index({ unique: true })
  @Column({ length: 50 })
  username: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ nullable: true, length: 255 })
  password?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: "bool", default: false })
  isOauth: boolean;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({ type: "bool", default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];

  // * Relasi one to one begini
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Cat, (cat) => cat.user)
  cats: Cat[];

  @OneToMany(() => CatBreed, (catBreed) => catBreed.author)
  catBreeds: CatBreed[];

  @OneToMany(() => Transaction, (transaction) => transaction.buyer)
  buyerTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.seller)
  sellerTransactions: Transaction[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
