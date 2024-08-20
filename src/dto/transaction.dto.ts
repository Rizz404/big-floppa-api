import { IsDate, IsDecimal, IsNotEmpty, IsUUID } from "class-validator";

export class Transaction {
  @IsNotEmpty()
  @IsDecimal()
  fee: number;

  @IsNotEmpty()
  @IsDecimal()
  subTotal: number;

  @IsNotEmpty()
  @IsDecimal()
  total: number;

  @IsNotEmpty()
  @IsDate()
  transactionDate: Date;

  @IsNotEmpty()
  @IsUUID("4")
  buyer: string;

  @IsNotEmpty()
  @IsUUID("4")
  seller: string;

  @IsNotEmpty()
  @IsUUID("4")
  payment: string;
}
