import { PaymentStatus } from "@/entity/Payment.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty({ message: "Payment method is required" })
  paymentMethod: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus, {
    message: "Payment status must be pending, complete, or failed",
  })
  status: PaymentStatus;
}
