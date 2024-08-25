import { IsString } from "class-validator";

export class UserCreatePayloadDto {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
