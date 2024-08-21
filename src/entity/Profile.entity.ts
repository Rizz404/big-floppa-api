import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  MENTAL_ILLNESS = "MENTAL_ILLNESS",
}

// * Kalo mau jadi javascript harus explisit typenya
@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true, length: 50 })
  firstname?: string;

  @Column({ type: "varchar", nullable: true, length: 50 })
  lastname?: string;

  @Column({ type: "varchar", nullable: true })
  profilePicture?: string;

  @Column({ type: "enum", enum: Gender })
  gender?: Gender;

  @Column({ type: "smallint", nullable: true })
  age?: number;

  @Column({ type: "varchar", nullable: true, length: 30 })
  phoneNumber?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
