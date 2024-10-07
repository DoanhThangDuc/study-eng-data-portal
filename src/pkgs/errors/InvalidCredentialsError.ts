import { HttpError } from "routing-controllers";

export class InvalidCredentialsError extends HttpError {
  constructor(message: string) {
    super(401, message);
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      debugMessage: this.message,
      type: "InvalidCredentials",
      options: {},
      status: "ERROR",
    };
  }
}
