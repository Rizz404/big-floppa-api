import { CatStatus } from "../entity/Cat.entity";
import { Gender } from "../entity/Profile.entity";
import BaseQueryDto from "../utils/base.query.dto";
import {
  IsNotEmpty,
  Length,
  IsOptional,
  MinLength,
  IsUUID,
  IsString,
} from "class-validator";

export class CreateBreedDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString()
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name: string;

  @IsNotEmpty({ message: "Description is required" })
  @IsString()
  @MinLength(4, { message: "Description must be greater then 4" })
  description: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: "Description must be greater then 4" })
  image?: string;
}

export class UpdateBreedDto {
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: "Description must be greater then 4" })
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: "Description must be greater then 4" })
  image?: string;
}

export class BreedQueryDto extends BaseQueryDto {}
