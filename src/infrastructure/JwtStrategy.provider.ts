import { appConfigs } from "../pkgs/config/AppConfigs";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DB } from "../db/types";
import { KyselyReaderService } from "./KyselyReaderService.provider";

appConfigs.setup();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigs.jwtSecret,
    });
  }

  async validate(payload: any) {
    return payload;

    // const [user] = await this.kyselyReaderService
    //   .selectFrom("User")
    //   .select("User.id")
    //   .select("User.emailAddress")
    //   .select("User.emailAddressVerified")
    //   .select("User.administrator")
    //   .select("User.enabled")
    //   .where("User.emailAddress", "=", payload.emailAddress.toLowerCase())
    //   .execute();

    // if (!user) {
    //   throw new UnauthorizedException("User not found!");
    // }

    // return user;
  }
}
