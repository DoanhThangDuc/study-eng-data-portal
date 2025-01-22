import { AppConfigs } from "./AppConfigs";
import * as dotenv from "dotenv";

export class AppConfigsEnvironment implements AppConfigs {
  setup() {
    dotenv.config();
  }

  get port(): number {
    return Number.parseInt(process.env.PORT) || 4200;
  }

  get pgHost(): string {
    return process.env.DATABASE_HOST || "localhost";
  }

  get maxPool(): number {
    return Number.parseInt(process.env.MAX_POOL) || 10;
  }

  get minPool(): number {
    return Number.parseInt(process.env.MIN_POOL) || 2;
  }

  get pgPort(): number {
    return Number.parseInt(process.env.DATABASE_PORT) || 5432;
  }
  get pgClient(): string {
    return process.env.DATABASE_CLIENT || "postgres";
  }

  get pgDbName(): string {
    return process.env.DATABASE_NAME || "study_eng";
  }

  get pgUser(): string {
    return process.env.DATABASE_USER || "postgres";
  }

  get pgPass(): string {
    return String(process.env.DATABASE_PASSWORD) || "password";
  }
  get hashSaltLogRounds(): number {
    return Number.parseInt(process.env.HASH_SALT_LOG_ROUNDS) || 10;
  }
  get jwtAccessSecret(): string {
    return process.env.JWT_ACCESSTOKEN_SECRET || "secret";
  }
  get jwtRefreshSecret(): string {
    return process.env.JWT_REFRESHTOKEN_SECRET || "secret";
  }
  get accessTokenExpiresIn(): string {
    return process.env.ACCESSTOKEN_TOKEN_EXPIRATION_TIME || "1h";
  }
  get refreshTokenExpiresIn(): string {
    return process.env.REFRESHTOKEN_TOKEN_EXPIRATION_TIME || "1h";
  }
}
