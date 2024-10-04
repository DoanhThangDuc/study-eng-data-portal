import * as jwt from "jsonwebtoken";
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
export function generateAccessToken(
  tokenUser: TokenUser,
  jwtSecret: string,
  expiresIn: string,
): { accessToken: string } {
  const token = jwt.sign(tokenUser, jwtSecret, {
    algorithm: "HS256",
    header: {
      authorization: true,
    } as any,
    expiresIn,
  });

  return { accessToken: token };
}

export function generateUserRefreshToken(
  jwtSecret: string,
  sessionId: string,
  groupId?: string,
): string {
  const payload = {
    sessionId,
    groupId,
  };

  const token = jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    header: {
      refresh: true,
      iat: Math.round(Date.now() / 1000),
    } as any,
  });

  return token;
}

export async function validateAccessToken(
  token: string,
  secret: string,
): Promise<JwtPayload | null> {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    return decoded;
  } catch (err) {
    throw new Error(err);
  }
}
