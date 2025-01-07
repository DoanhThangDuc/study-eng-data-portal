import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return {
      message:
        "Hello this is a non-profit project to support students to learn English",
    };
  }
}
