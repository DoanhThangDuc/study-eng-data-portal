import { Injectable } from "@nestjs/common";
import { UserCreatePayloadDto } from "./UserCreatePayloadDto";
import { UserRegisterAction } from "./UserRegisterAction";
import { InteractorContext } from "../../InteractorContext";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";

@Injectable()
export class UserRegisterInteractor {
  constructor(private readonly userRegisterAction: UserRegisterAction) {}
  async execute(context: InteractorContext, payload: UserCreatePayloadDto) {
    const { accessToken, refreshToken, userResponse } =
      await this.userRegisterAction.execute(context, payload);

    return {
      accessToken,
      refreshToken,
      userResponse,
    };
  }
}
