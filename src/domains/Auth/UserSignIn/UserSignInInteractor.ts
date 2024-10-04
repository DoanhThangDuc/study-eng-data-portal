import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInAction } from "./UserSignInAction";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";

@Injectable()
export class UserSignInInteractor {
  constructor(private readonly userSignInAction: UserSignInAction) {}

  async execute(payload: UserSignInPayloadDto) {
    const user = await this.userSignInAction.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException("User not found!");
    }

    return user;
  }
}
