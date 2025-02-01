import { appConfigs } from "../pkgs/config/AppConfigs";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

appConfigs.setup();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigs.jwtAccessTokenSecret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
