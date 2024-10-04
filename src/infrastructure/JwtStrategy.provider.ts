import { appConfigs } from "../pkgs/config/AppConfigs";
import { Strategy } from "passport-local";

import { ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DB } from "../db/types";
import { KyselyReaderService } from "./KyselyReaderService.provider";

appConfigs.setup();
const { jwtSecret } = appConfigs;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private kyselyReaderService: KyselyReaderService<DB>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload) {
    console.log("payload", payload);

    const [user] = await this.kyselyReaderService
      .selectFrom("User")
      .select("User.id")
      .select("User.emailAddress")
      .select("User.emailAddressVerified")
      .select("User.administrator")
      .select("User.enabled")
      .where("User.emailAddress", "=", payload.emailAddress.toLowerCase())
      .execute();

    if (!user) {
      throw new UnauthorizedException("User not found!");
    }

    return user;
  }
}
