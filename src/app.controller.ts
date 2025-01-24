import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(private readonly congfigService: ConfigService) {}

  @Get()
  getHello() {
    return {
      message: `Hello this is a non-profit project to support students to learn English:\n env ${process.env.JWT_ACCESSTOKEN_SECRET};\n env config service: ${this.congfigService.get("jwt.jwtAccessSecret")}`,
    };
  }
}
