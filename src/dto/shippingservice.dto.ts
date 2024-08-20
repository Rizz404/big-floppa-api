import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateShippingServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  fee: number;
}
