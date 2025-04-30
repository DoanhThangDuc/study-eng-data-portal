import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { InvalidAuthorizationTokenError } from "../pkgs/errors/InvalidAuthorizationTokenError";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest(error: any, user: any, info: any, context: ExecutionContext) {
    if (user) {
      return user;
    }

    if (
      error ||
      (info &&
        (info.message === "invalid signature" ||
          info.message === "invalid token"))
    ) {
      throw new InvalidAuthorizationTokenError();
    }

    return null;
  }
}
