import BaseQueryDto from "@/utils/base.query.dto";
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  ValidateIf,
  IsIn,
  IsBooleanString,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Username is required" })
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsOptional()
  @Length(6, 100, { message: "Password must be between 6 and 100 characters" })
  password?: string;
}

export class LoginDto {
  @ValidateIf((o) => !o.email) // * Validasi hanya jika email tidak diisi
  @IsNotEmpty({ message: "Username is required" })
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username: string;

  @ValidateIf((o) => !o.username) // * Validasi hanya jika username tidak diisi
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 100, { message: "Password must be between 6 and 100 characters" })
  password?: string;
}

export class UserQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(["ADMIN", "USER", "admin", "user"], {
    message: "Role must be admin or user",
  })
  role?: string;

  @IsBooleanString()
  @IsOptional()
  isOauth?: string;

  @IsBooleanString()
  @IsOptional()
  isVerified?: string;
}
