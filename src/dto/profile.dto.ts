import { Gender } from "@/entity/Profile.entity";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

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
  @IsNumber({}, { message: "Must be number" })
  age?: number;

  @IsOptional()
  @IsString({ message: "Must be string" })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: "Must be string" })
  bio?: string;
}
