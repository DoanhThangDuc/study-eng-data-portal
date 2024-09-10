import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "Hello this is a non-profit project to support students to learn English";
  }
}
