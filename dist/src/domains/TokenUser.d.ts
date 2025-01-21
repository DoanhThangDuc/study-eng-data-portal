import { JwtPayload } from "jsonwebtoken";
export type TokenUser = {
    readonly id: string;
    readonly emailAddress: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly emailAddressVerified: boolean;
    readonly administrator: boolean;
    readonly enabled: boolean;
};
export declare function generateAccessToken(tokenUser: TokenUser, jwtSecret: string, expiresIn: string): {
    accessToken: string;
};
export declare function generateUserRefreshToken(jwtSecret: string, sessionId: string, groupId?: string): string;
export declare function validateAccessToken(token: string, secret: string): Promise<JwtPayload | null>;
