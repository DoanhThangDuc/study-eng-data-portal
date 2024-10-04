import { Injectable } from "@nestjs/common";
import { UserSignInAction } from "./UserSignInAction";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { InteractorContext } from "../../InteractorContext";
import { TokenUser } from "../../TokenUser";

@Injectable()
export class UserSignInInteractor {
  constructor(private readonly userSignInAction: UserSignInAction) {}

  async execute(
    context: InteractorContext,
    payload: UserSignInPayloadDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    userResponse: TokenUser;
  }> {
    const response = await this.userSignInAction.execute(context, payload);

    return response;
  }
}
