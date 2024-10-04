import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { UserCreatePayloadDto } from "../domains/Auth/UserRegister/UserCreatePayloadDto";
import { UserRegisterInteractor } from "../domains/Auth/UserRegister/UserRegisterInteractor";
import { UserSignInPayloadDto } from "../domains/Auth/dtos/UserSignInPayloadDto";
import { UserSignInInteractor } from "../domains/Auth/UserSignIn/UserSignInInteractor";
import { JwtAuthGuard } from "../infrastructure/JwtAuthGuard.provider";
import { AuthGuard } from "@nestjs/passport";

@Controller("/v1")
export class AuthController {
  constructor(
    private userRegisterInteractor: UserRegisterInteractor,
    private userSignInInteractor: UserSignInInteractor,
  ) {}

  @Post("/users")
  userRegister(
    @Body(new ValidationPipe()) payload: UserCreatePayloadDto,
    @Req() request: any,
  ) {
    return this.userRegisterInteractor.execute(request, payload);
  }

  @Post("/users/login")
  @UseGuards(JwtAuthGuard)
  userSignIn(@Body(new ValidationPipe()) payload: UserSignInPayloadDto) {
    return this.userSignInInteractor.execute(payload);
  }
}
