import { Injectable } from "@nestjs/common";
import { InteractorContext } from "../../InteractorContext";
import { UnauthorizedError } from "../../../pkgs/errors/UnauthorizedError";

@Injectable()
export class UserGetMeInteractor {
  constructor() {}
  async execute(context: InteractorContext) {
    const { user } = context;

    if (!user) {
      throw new UnauthorizedError("Token user is required!");
    }

    return user;
  }
}
