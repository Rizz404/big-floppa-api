import { CatStatus } from "@/entity/Cat.entity";
import { Gender } from "@/entity/Profile.entity";
import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsNumber,
  IsEnum,
  MinLength,
  IsDecimal,
  IsUUID,
} from "class-validator";

export class CreateBreedDto {
  @IsNotEmpty({ message: "Name is required" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name: string;

  @IsNotEmpty({ message: "Author is required" })
  @IsUUID("4", { message: "Must be UUID" })
  author: string;

  @IsNotEmpty({ message: "Description is required" })
  @MinLength(4, { message: "Description must be greater then 4" })
  description: string;
}
