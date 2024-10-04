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

  get pgPort(): number {
    return Number.parseInt(process.env.DATABASE_PORT) || 5432;
  }

  get pgDbName(): string {
    return process.env.DATABASE_NAME || "study_eng";
  }

  get pgUser(): string {
    return process.env.DATABASE_USER || "postgres";
  }

  get pgPass(): string {
    return process.env.DATABASE_PASSWORD || "password";
  }
  get hashSaltLogRounds(): number {
    return Number.parseInt(process.env.HASH_SALT_LOG_ROUNDS) || 10;
  }
  get jwtSecret(): string {
    return process.env.JWT_ACCESSTOKEN_SECRET_SECRET || "secret";
  }
  get expiresIn(): string {
    return process.env.TOKEN_EXPIRATION_TIME || "1h";
  }
}
