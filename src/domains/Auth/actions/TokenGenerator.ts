import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenUser } from "../../TokenUser";
import { ConfigService } from "@nestjs/config";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";

@Injectable()
export class TokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(payload: TokenUser) {
    const jwtAccessTokenSecret = this.configService.get<string>(
      "jwt.jwtAccessTokenSecret",
    );
    const accessTokenExpiration = this.configService.get<string>(
      "jwt.accessTokenExpiration",
    );

    if (!jwtAccessTokenSecret || !accessTokenExpiration) {
      throw new IllegalStateError("Token keys environment is required!");
    }

    return this.jwtService.sign(payload, {
      secret: jwtAccessTokenSecret,
      expiresIn: accessTokenExpiration,
    });
  }

  generateRefreshToken({ userId }: { userId: string }) {
    const jwtRefreshTokenSecret = this.configService.get<string>(
      "jwt.jwtRefreshTokenSecret",
    );
    const refreshTokenExpiration = this.configService.get<string>(
      "jwt.refreshTokenExpiration",
    );

    if (!jwtRefreshTokenSecret || !refreshTokenExpiration) {
      throw new IllegalStateError("Token keys environment is required!");
    }

    return this.jwtService.sign(
      { userId },
      {
        secret: jwtRefreshTokenSecret,
        expiresIn: refreshTokenExpiration,
      },
    );
  }
}
