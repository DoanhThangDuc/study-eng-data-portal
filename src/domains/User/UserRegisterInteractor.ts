import { Injectable } from "@nestjs/common";
import { UserCreatePayloadDto } from "./dtos/UserCreatePayloadDto";
import { KyselyReaderService } from "../../infrastructure/KyselyReaderService.provider";
import { DB } from "../../db/types";
import { UserRegisterAction } from "./actions/UserRegisterAction";

@Injectable()
export class UserRegisterInteractor {
  constructor(
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private readonly userRegisterAction: UserRegisterAction,
  ) {}
  async execute(context: any, payload: UserCreatePayloadDto) {
    const { accessToken, refreshToken, userResponse } =
      await this.userRegisterAction.execute(payload);

    return {
      accessToken,
      refreshToken,
      userResponse,
    };
  }
}
