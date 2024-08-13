import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile.entity";
import { Cat } from "./Cat.entity";
import { CatRace } from "./CatRace.entity";

// * Urutannya migration:generate terus migration:run terus migration:create

export enum UserRole {
  ADMIN,
  USER,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // * Kalau ada index dan true bersamaan usahakan di decorator saja
  @Index({ unique: true })
  @Column({ length: 50 })
  username: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ nullable: true, length: 255 })
  password?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: false })
  isOauth: boolean;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // * Relasi one to one begini
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Cat, (cat) => cat.user)
  cats: Cat[];

  @OneToMany(() => CatRace, (catRace) => catRace.author)
  catRaces: CatRace[];
}
