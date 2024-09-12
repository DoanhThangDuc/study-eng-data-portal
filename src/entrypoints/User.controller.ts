import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { UserRegisterInteractor } from "../domains/User/UserRegisterInteractor";
import { UserCreatePayloadDto } from "../domains/User/dtos/UserCreatePayloadDto";

@Controller("/v1")
export class UserController {
  constructor(private userRegisterInteractor: UserRegisterInteractor) {}
  @Post("/users")
  userRegister(
    @Body(new ValidationPipe()) payload: UserCreatePayloadDto,
    @Req() request: any,
  ) {
    return this.userRegisterInteractor.execute(request, payload);
  }
}
