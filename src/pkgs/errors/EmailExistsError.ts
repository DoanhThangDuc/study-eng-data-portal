import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailExistsError extends HttpException {
  constructor() {
    super("CONFLICT", HttpStatus.CONFLICT);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      type: "EmailExists",
      options: {},
      status: "ERROR",
      debugMessage: "This email address is already being used",
    };
  }
}
