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
import { Province } from "./Province.entity";
import { District } from "./District.entity";
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class City {
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

  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  @OneToMany(() => District, (district) => district.city)
  disctricts: District[];

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];
}
