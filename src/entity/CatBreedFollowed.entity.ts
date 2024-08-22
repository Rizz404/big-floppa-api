import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { CatBreed } from "./CatBreed.entity";

@Entity()
@Index(["user", "catBreed"], { unique: true })
export class CatBreedFollowed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.catBreedFolloweds)
  user: User;

  @ManyToOne(() => CatBreed, (catBreed) => catBreed.catBreedFolloweds)
  catBreed: CatBreed;
}
