"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigsEnvironment = void 0;
const dotenv = require("dotenv");
class AppConfigsEnvironment {
    setup() {
        dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    }
    get port() {
        return Number.parseInt(process.env.PORT) || 4200;
    }
    get pgHost() {
        return process.env.DATABASE_HOST || "localhost";
    }
    get maxPool() {
        return Number.parseInt(process.env.MAX_POOL) || 10;
    }
    get minPool() {
        return Number.parseInt(process.env.MIN_POOL) || 2;
    }
    get pgPort() {
        return Number.parseInt(process.env.DATABASE_PORT) || 5432;
    }
    get pgClient() {
        return process.env.DATABASE_CLIENT || "postgres";
    }
    get pgDbName() {
        return process.env.DATABASE_NAME || "study_eng";
    }
    get pgUser() {
        return process.env.DATABASE_USER || "postgres";
    }
    get pgPass() {
        return process.env.DATABASE_PASSWORD || "password";
    }
    get hashSaltLogRounds() {
        return Number.parseInt(process.env.HASH_SALT_LOG_ROUNDS) || 10;
    }
    get jwtAccessSecret() {
        return process.env.JWT_ACCESSTOKEN_SECRET || "secret";
    }
    get jwtRefreshSecret() {
        return process.env.JWT_REFRESHTOKEN_SECRET || "secret";
    }
    get accessTokenExpiresIn() {
        return process.env.ACCESSTOKEN_TOKEN_EXPIRATION_TIME || "1h";
    }
    get refreshTokenExpiresIn() {
        return process.env.REFRESHTOKEN_TOKEN_EXPIRATION_TIME || "1h";
    }
}
exports.AppConfigsEnvironment = AppConfigsEnvironment;
//# sourceMappingURL=AppConfigsEnvironment.js.map