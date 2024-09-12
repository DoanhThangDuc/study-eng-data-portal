import { Injectable } from "@nestjs/common";
import { UserCreatePayloadDto } from "./dtos/UserCreatePayloadDto";
import { UserRegisterAction } from "./actions/UserRegisterAction";
import { InteractorContext } from "../InteractorContext";

@Injectable()
export class UserRegisterInteractor {
  constructor(private readonly userRegisterAction: UserRegisterAction) {}
  async execute(context: InteractorContext, payload: UserCreatePayloadDto) {
    const { accessToken, refreshToken, userResponse } =
      await this.userRegisterAction.execute(payload);

    return {
      accessToken,
      refreshToken,
      userResponse,
    };
  }
}
