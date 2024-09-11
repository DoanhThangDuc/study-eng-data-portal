import { HttpError } from "routing-controllers";

export class IllegalStateError extends HttpError {
  constructor(private debugMessage: string) {
    super(500);
    Object.setPrototypeOf(this, IllegalStateError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      type: "IllegalState",
      options: this.stack,
      status: "ERROR",
      debugMessage: this.debugMessage,
    };
  }
}
