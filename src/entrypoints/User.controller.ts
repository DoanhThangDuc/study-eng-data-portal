import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserRegisterInteractor } from "../domains/User/UserRegisterInteractor";
import { UserCreatePayloadDto } from "../domains/User/UserCreatePayloadDto";

@Controller("/v1")
export class UserController {
  constructor(private userRegisterInteractor: UserRegisterInteractor) {}
  @Post("/users")
  userRegister(@Body() payload: UserCreatePayloadDto, @Req() request: any) {
    console.log("userRegister :>> ");

    return this.userRegisterInteractor.execute(payload);
  }
}
