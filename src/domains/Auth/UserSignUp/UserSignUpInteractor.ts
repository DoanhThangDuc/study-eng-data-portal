import { Injectable } from "@nestjs/common";
import { UserSignUpPayloadDto } from "./UserSignUpPayloadDto";
import { UserSignUpAction } from "./UserSignUpAction";
import { InteractorContext } from "../../InteractorContext";

@Injectable()
export class UserSignUpInteractor {
  constructor(private readonly userSignUpAction: UserSignUpAction) {}
  async execute(context: InteractorContext, payload: UserSignUpPayloadDto) {
    const { accessToken, refreshToken, userResponse } =
      await this.userSignUpAction.execute(context, payload);

    return {
      accessToken,
      refreshToken,
      userResponse,
    };
  }
}
