import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { UserCreatePayloadDto } from "../domains/Auth/UserRegister/UserCreatePayloadDto";
import { UserRegisterInteractor } from "../domains/Auth/UserRegister/UserRegisterInteractor";
import { UserSignInPayloadDto } from "../domains/Auth/dtos/UserSignInPayloadDto";
import { UserSignInInteractor } from "../domains/Auth/UserSignIn/UserSignInInteractor";
import { AppRequest } from "../domains/InteractorContext";
import { IllegalStateError } from "../pkgs/errors/IllegalStateError";
import { Response } from "express";

@Controller("/v1")
export class AuthController {
  constructor(
    private userRegisterInteractor: UserRegisterInteractor,
    private userSignInInteractor: UserSignInInteractor,
  ) {}

  @Post("/auth/signup")
  userRegister(
    @Body(new ValidationPipe()) payload: UserCreatePayloadDto,
    @Req() request: AppRequest,
  ) {
    return this.userRegisterInteractor.execute(request, payload);
  }

  @Post("/auth/signin")
  async userSignIn(
    @Req() request: AppRequest,
    @Res() response: Response,
    @Body(new ValidationPipe()) payload: UserSignInPayloadDto,
  ) {
    const { accessToken, refreshToken, userResponse } =
      await this.userSignInInteractor.execute(request, payload);

    response.setHeader("Authorization", accessToken);
    response.setHeader("RefreshToken", refreshToken);

    return response.status(200).json(userResponse);
  }

  @Get("/auth/status")
  getStatus(@Req() request: AppRequest) {
    if (!request.user) {
      throw new IllegalStateError("User not logged");
    }
    return request.user;
  }
}
