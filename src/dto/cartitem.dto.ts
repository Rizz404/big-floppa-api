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

export class CreateCartItemDto {
  @IsNotEmpty({ message: "Cat is required" })
  @IsUUID("4", { message: "Must be UUID" })
  cat: string;

  @IsNotEmpty({ message: "Cart is required" })
  @IsUUID("4", { message: "Must be UUID" })
  cart: string;

  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({}, { message: "Must be number" })
  quantity: number;
}
