import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate() {}
}
