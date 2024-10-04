import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidAuthorizationTokenException extends HttpException {
  constructor() {
    super(
      {
        status: "ERROR",
        type: "InvalidAuthorizationToken",
        debugMessage: "The Token's Signature resulted invalid",
        options: {},
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
