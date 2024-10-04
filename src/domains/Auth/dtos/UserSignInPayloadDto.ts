import { IsEmail, IsHash, IsNotEmpty } from "class-validator";

export class UserSignInPayloadDto {
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsHash("sha256")
  password!: string;
}
