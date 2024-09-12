import { HttpStatus } from "@nestjs/common";
import { HttpError } from "routing-controllers";

export class EmailExistsError extends HttpError {
  constructor() {
    super(HttpStatus.CONFLICT);
    Object.setPrototypeOf(this, EmailExistsError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      type: "EmailExists",
      options: this.stack,
      status: "ERROR",
      debugMessage: "This email address is already being used",
    };
  }
}
