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
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class Province {
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

  @ManyToOne(() => Country, (country) => country.provinces)
  country: Country;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];
}
