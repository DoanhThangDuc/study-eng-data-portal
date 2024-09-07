import { IsEmail, IsHash, IsNotEmpty, IsString } from "class-validator";

export class UserCreatePayloadDto {
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsHash("sha256")
  preHashedPassword!: string;
}
