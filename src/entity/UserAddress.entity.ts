import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @ManyToOne(() => User, (user) => user.userAddreses)
  user: User;
}
