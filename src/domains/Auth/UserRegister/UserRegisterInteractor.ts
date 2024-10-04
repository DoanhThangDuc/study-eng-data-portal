import { Injectable } from "@nestjs/common";
import { UserCreatePayloadDto } from "./UserCreatePayloadDto";
import { UserRegisterAction } from "./UserRegisterAction";
import { InteractorContext } from "../../InteractorContext";

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
