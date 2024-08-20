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
  IsMimeType,
  IsUrl,
} from "class-validator";

export class CreateCatPictureDto {
  @IsNotEmpty({ message: "Cat is required" })
  @IsUUID("4", { message: "Must be UUID" })
  cat: string;

  @IsOptional()
  fieldname?: string;

  @IsNotEmpty({ message: "Original name required" })
  originalname: string;

  @IsNotEmpty({ message: "Mime type required" })
  @IsMimeType({ message: "Must be mime type" })
  mimetype: string;

  @IsNotEmpty({ message: "Size required" })
  @IsNumber({}, { message: "Must a number" })
  size: number;

  @IsOptional()
  destination?: string;

  @IsOptional()
  filename?: string;

  @IsNotEmpty({ message: "Path required" })
  path: string;

  @IsNotEmpty({ message: "Url required" })
  @IsUrl({}, { message: "Must be url" })
  url: string;
}
