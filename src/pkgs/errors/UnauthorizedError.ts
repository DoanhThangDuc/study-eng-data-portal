import { HttpStatus } from "@nestjs/common";
import { HttpError } from "routing-controllers";

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      debugMessage: this.message,
      type: "UnauthorizedError",
      options: {},
      status: "ERROR",
    };
  }
}
