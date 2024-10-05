import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenUser } from "../../TokenUser";
import { AppConfigsEnvironment } from "../../../pkgs/config/AppConfigsEnvironment";

@Injectable()
export class TokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigs: AppConfigsEnvironment,
  ) {}

  generateAccessToken(payload: TokenUser) {
    return this.jwtService.sign(payload, {
      secret: this.appConfigs.jwtAccessSecret,
      expiresIn: this.appConfigs.accessTokenExpiresIn,
    });
  }

  generateRefreshToken({ userId }: { userId: string }) {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.appConfigs.jwtRefreshSecret,
        expiresIn: this.appConfigs.refreshTokenExpiresIn,
      },
    );
  }
}
