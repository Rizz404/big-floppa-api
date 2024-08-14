import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Province } from "./Province.entity";
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class Country {
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

  @OneToMany(() => Province, (province) => province.country)
  provinces: Province[];

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];
}
