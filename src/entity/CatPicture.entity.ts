import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cat } from "./Cat.entity";

export class CatPicture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  fieldname?: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  destination?: string;

  @Column({ nullable: true })
  filename?: string;

  @Column()
  path: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cat, (cat) => cat.catPictures)
  cat: Cat;
}
