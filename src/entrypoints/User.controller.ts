import { Controller, Get, Req } from "@nestjs/common";
import { AppRequest } from "../domains/InteractorContext";
import { UserGetMeInteractor } from "../domains/Auth/UserGetMe/UserGetMeInteractor";

@Controller("/v1")
export class UserController {
  constructor(private userGetMeInteractor: UserGetMeInteractor) {}
  @Get("/users/me")
  async getMe(@Req() request: AppRequest) {
    return await this.userGetMeInteractor.execute(request);
  }
}
