import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cat } from "./Cat.entity";

@Entity()
export class CatPicture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true })
  fieldname?: string;

  @Column({ type: "varchar" })
  originalname: string;

  @Column({ type: "varchar" })
  mimetype: string;

  @Column({ type: "int" })
  size: number;

  @Column({ type: "varchar", nullable: true })
  destination?: string;

  @Column({ type: "varchar", nullable: true })
  filename?: string;

  @Column({ type: "varchar" })
  path: string;

  @Column({ type: "varchar" })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cat, (cat) => cat.catPictures)
  cat: Cat;
}
