import { CatStatus } from "../entity/Cat.entity";
import { Gender } from "../entity/Profile.entity";
import BaseQueryDto from "../utils/base.query.dto";
import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsNumber,
  IsEnum,
  MinLength,
  IsDecimal,
  IsUUID,
  IsIn,
} from "class-validator";

export class CreateCatDto {
  @IsOptional()
  @Length(3, 20, { message: "Name must be between 3 and 20 characters" })
  name?: string;

  @IsNotEmpty({ message: "User is required" })
  @IsUUID("4", { message: "Must be UUID" })
  user: string;

  @IsNotEmpty({ message: "Cat breed is required" })
  @IsUUID("4", { message: "Must be UUID" })
  catBreed: string;

  @IsNotEmpty({ message: "Age is required" })
  @IsNumber(
    { maxDecimalPlaces: 20 },
    { message: "Age must a number and not greater than or equal to 24" }
  )
  age: number;

  @IsNotEmpty({ message: "Gender is required" })
  @IsEnum(Gender, { message: "Must male or female" })
  gender: Gender;

  @IsNotEmpty({ message: "Description is required" })
  @MinLength(4, { message: "Description must be greater then 4" })
  description: string;

  @IsNotEmpty({ message: "Price is required" })
  @IsDecimal({}, { message: "Must be decimal" })
  price: number;

  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({}, { message: "Must be number" })
  quantity: number;

  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(CatStatus, { message: "Must be available, sold, or adopted" })
  status: CatStatus;
}

export class CatQueryDto extends BaseQueryDto {}
