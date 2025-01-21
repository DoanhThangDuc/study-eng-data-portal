import { JwtService } from "@nestjs/jwt";
import { TokenUser } from "../../TokenUser";
import { ConfigService } from "@nestjs/config";
export declare class TokenGenerator {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateAccessToken(payload: TokenUser): string;
    generateRefreshToken({ userId }: {
        userId: string;
    }): string;
}
