import { IsIn, IsOptional } from "class-validator";

export default class BaseQueryDto {
  @IsOptional()
  @IsIn(["asc", "desc"], { message: "Order must be either asc or desc" })
  order?: string;
}
