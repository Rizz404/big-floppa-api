import { Gender } from "@/entity/Profile.entity";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  @IsString({ message: "Must be string" })
  firstname?: string;

  @IsOptional()
  @IsString({ message: "Must be string" })
  lastname?: string;

  @IsOptional()
  @IsString({ message: "Must be string" })
  profilePicture?: string;

  @IsOptional()
  @IsEnum(Gender, { message: "Must male or female" })
  gender?: Gender;

  @IsOptional()
  @IsInt()
  @Min(1, { message: "Age must be at least 1" })
  @Max(120, { message: "Age must be less than or equal to 120" })
  age?: number;

  @IsOptional()
  @IsPhoneNumber("ID", { message: "Invalid phone number" })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: "Must be string" })
  bio?: string;
}
