import { HttpError } from "routing-controllers";

export class InvalidCredentialsError extends HttpError {
  constructor() {
    super(401);
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      type: "InvalidCredentials",
      options: {},
      status: "ERROR",
    };
  }
}
