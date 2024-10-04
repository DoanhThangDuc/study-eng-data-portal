import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInAction } from "./UserSignInAction";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { DB } from "../../../db/types";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserSignInInteractor {
  constructor(
    private readonly userSignInAction: UserSignInAction,
    private readonly kyselyReaderService: KyselyReaderService<DB>,
  ) {}

  async execute(payload: UserSignInPayloadDto) {
    const user = await this.userSignInAction.mockValidateUser(payload);

    if (!user) {
      throw new UnauthorizedException("User not found!");
    }

    return user;
  }
}
