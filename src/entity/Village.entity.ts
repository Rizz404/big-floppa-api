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
import { District } from "./District.entity";
import { UserAddress } from "./UserAddress.entity";

@Entity()
export class Village {
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

  @ManyToOne(() => District, (district) => district.villages)
  district: District;

  @OneToMany(() => UserAddress, (userAddres) => userAddres.user)
  userAddreses: UserAddress[];
}
