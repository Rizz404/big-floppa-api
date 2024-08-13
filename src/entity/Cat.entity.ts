import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Gender } from "./Profile.entity";
import { User } from "./User.entity";
import { CatPicture } from "./CatPicture.entity";
import { CatRace } from "./CatRace.entity";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ nullable: true })
  name?: string;

  @Column({ type: "smallint" })
  age: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cats)
  user: User;

  @OneToMany(() => CatPicture, (catPicture) => catPicture.cat)
  catPictures: CatPicture[];

  @ManyToMany(() => CatRace)
  @JoinTable()
  catRaces: CatRace[];
}
