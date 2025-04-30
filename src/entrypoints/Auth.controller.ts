import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { UserSignUpPayloadDto } from "../domains/Auth/UserSignUp/UserSignUpPayloadDto";
import { UserSignUpInteractor } from "../domains/Auth/UserSignUp/UserSignUpInteractor";
import { UserSignInPayloadDto } from "../domains/Auth/dtos/UserSignInPayloadDto";
import { UserSignInInteractor } from "../domains/Auth/UserSignIn/UserSignInInteractor";
import { AppRequest } from "../domains/InteractorContext";
import { Response } from "express";
import { IllegalStateError } from "../pkgs/errors/IllegalStateError";

@Controller("/v1")
export class AuthController {
  constructor(
    private userSignUpInteractor: UserSignUpInteractor,
    private userSignInInteractor: UserSignInInteractor,
  ) {}

  @Post("/auth/signup")
  userSignUp(
    @Body(new ValidationPipe()) payload: UserSignUpPayloadDto,
    @Req() request: AppRequest,
  ) {
    return this.userSignUpInteractor.execute(request, payload);
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
