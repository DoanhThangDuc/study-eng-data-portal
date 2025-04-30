import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidAuthorizationTokenError extends HttpException {
  constructor() {
    super(
      {
        status: "ERROR",
        type: "InvalidAuthorizationTokenError",
        debugMessage: "The Token's Signature resulted invalid",
        options: {},
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
