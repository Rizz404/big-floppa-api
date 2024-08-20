import BaseQueryDto from "@/utils/base.query.dto";
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  ValidateIf,
  IsIn,
  IsBooleanString,
  IsEnum,
} from "class-validator";
import { UpdateProfileDto } from "./profile.dto";
import { UserRole } from "@/entity/User.entity";

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

export class UpdateUserDto extends UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty({ message: "Username is required" })
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email?: string;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty({ message: "Old password is required" })
  @Length(6, 100, {
    message: "Old password must be between 6 and 100 characters",
  })
  oldPassword?: string;

  @IsNotEmpty({ message: "New password is required" })
  @Length(6, 100, {
    message: "NewPassword password must be between 6 and 100 characters",
  })
  newPassword?: string;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { message: "Role must be admin or user" })
  role: string;
}

export class UserQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsEnum(UserRole, { message: "Role must be admin or user" })
  role?: string;

  @IsBooleanString()
  @IsOptional()
  isOauth?: string;

  @IsBooleanString()
  @IsOptional()
  isVerified?: string;
}
