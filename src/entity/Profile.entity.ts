import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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
  @Column({ length: 50 })
  firstname?: string;

  @Column({ length: 50 })
  lastname?: string;

  @Column()
  profilePicture?: string;

  @Column({ type: "enum", enum: Gender })
  gender?: string;

  @Column({ type: "smallint" })
  age?: number;

  @Column({ length: 20 })
  phoneNumber?: string;

  @Column({ type: "text" })
  bio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
