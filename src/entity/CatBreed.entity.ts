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
import { User } from "./User.entity";
import { Cat } from "./Cat.entity";

// ! Ganti jadi Breed ya kali race lu kira orang
@Entity()
export class CatBreed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.catRaces)
  author: User;

  // * many to many cat races dan cat itu hanya ada di cat
  @OneToMany(() => Cat, (cat) => cat.catBreed)
  cats: Cat[];
}
