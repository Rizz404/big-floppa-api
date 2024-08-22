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
import { CatBreedFollowed } from "./CatBreedFollowed.entity";

// ! Ganti jadi Breed ya kali race lu kira orang
@Entity()
export class CatBreed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
    default:
      "https://i.pinimg.com/736x/8a/92/c1/8a92c186ecd1ec07e49dc9f570e304cb.jpg",
  })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.catBreeds)
  author: User;

  // * many to many cat races dan cat itu hanya ada di cat
  @OneToMany(() => Cat, (cat) => cat.catBreed)
  cats: Cat[];

  @OneToMany(
    () => CatBreedFollowed,
    (catBreedFollowed) => catBreedFollowed.catBreed
  )
  catBreedFolloweds: CatBreedFollowed[];
}
