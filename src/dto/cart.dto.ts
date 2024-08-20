import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty({ message: "User is required" })
  @IsUUID("4", { message: "Must be UUID" })
  user: string;
}
