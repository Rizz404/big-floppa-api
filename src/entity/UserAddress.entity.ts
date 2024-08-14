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
import { Country } from "./Country.entity";
import { City } from "./City.entity";
import { User } from "./User.entity";
import { Province } from "./Province.entity";
import { District } from "./District.entity";
import { Village } from "./Village.entity";

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  fullAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userAddreses)
  user: User;

  @ManyToOne(() => Country, (country) => country.userAddreses)
  country: Country;

  @ManyToOne(() => Province, (province) => province.userAddreses)
  province: Province;

  @ManyToOne(() => City, (city) => city.userAddreses)
  city: City;

  @ManyToOne(() => District, (district) => district.userAddreses)
  district: District;

  @ManyToOne(() => Village, (village) => village.userAddreses)
  village: Village;
}
