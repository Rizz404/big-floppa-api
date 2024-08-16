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
  Male,
  Female,
  Mental_Illness,
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // * Defaultnya varchar
  @Column({ nullable: true, length: 50 })
  firstname?: string;

  @Column({ nullable: true, length: 50 })
  lastname?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: "enum", enum: Gender })
  gender?: Gender;

  @Column({ nullable: true, type: "smallint" })
  age?: number;

  @Column({ nullable: true, length: 30 })
  phoneNumber?: string;

  @Column({ nullable: true, type: "text" })
  bio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
