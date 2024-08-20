import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export enum OrderStatus {
  PACKAGING = "PACKAGING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RECEIVED = "RECEIVED",
}

export class CreateOrderDto {
  @IsNotEmpty({ message: "Status required" })
  @IsEnum(OrderStatus, {
    message: "Must be packaging, shipped, delivered, or recieved",
  })
  status: OrderStatus;

  @IsNotEmpty({ message: "Amount required" })
  @IsNumber({}, { message: "Must be a number" })
  amount: number;

  @IsNotEmpty({ message: "User required" })
  @IsUUID("4", { message: "Must be UUID" })
  user: string;

  @IsNotEmpty({ message: "Cat required" })
  @IsUUID("4", { message: "Must be UUID" })
  cat: string;

  @IsNotEmpty({ message: "Shipping Service required" })
  @IsUUID("4", { message: "Must be UUID" })
  shippingService: string;

  @IsNotEmpty({ message: "Transaction required" })
  @IsUUID("4", { message: "Must be UUID" })
  transaction: string;
}
