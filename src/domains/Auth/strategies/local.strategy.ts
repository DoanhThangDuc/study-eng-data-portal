import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserSignInAction } from "../UserSignIn/UserSignInAction";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userSignInAction: UserSignInAction) {
    super({
      usernameField: "emailAddress",
      passwordField: "password",
    });
  }

  validate(emailAddress: string, password: string) {
    const user = this.userSignInAction.mockValidateUser({
      emailAddress,
      password,
    });

    return user;
  }
}
