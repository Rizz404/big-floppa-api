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
import { City } from "./City.entity";
import { Village } from "./Village.entity";
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class District {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => City, (city) => city.disctricts)
  city: City;

  @OneToMany(() => Village, (village) => village.district)
  villages: Village[];

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];
}
