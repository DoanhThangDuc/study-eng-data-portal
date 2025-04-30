import { HttpStatus } from "@nestjs/common";
import { HttpError } from "routing-controllers";

export class UserNotFoundError extends HttpError {
  constructor() {
    super(HttpStatus.NOT_FOUND);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      type: "UserNotFoundError",
      options: this.stack,
      status: "ERROR",
      debugMessage: "User not found",
    };
  }
}
