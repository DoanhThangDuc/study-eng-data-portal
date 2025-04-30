import { Injectable } from "@nestjs/common";
import { InteractorContext } from "../../InteractorContext";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";

@Injectable()
export class UserGetMeInteractor {
  constructor() {}
  async execute(context: InteractorContext) {
    const { user } = context;

    if (!user) {
      throw new IllegalStateError("Token user is required!");
    }

    return user;
  }
}
