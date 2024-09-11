import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { UserRegisterInteractor } from "../domains/User/UserRegisterInteractor";
import { UserCreatePayloadDto } from "../domains/User/dtos/UserCreatePayloadDto";
import { GlobalException } from "../pkgs/exceptions/GlobalException";
import { IllegalStateError } from "../pkgs/errors/IllegalStateError";

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
