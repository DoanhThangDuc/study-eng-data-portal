import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload) {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload) {
    return this.jwtService.sign(payload);
  }
}
