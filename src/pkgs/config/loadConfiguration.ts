import { ConfigurationInterface } from "./ConfigurationInterface";

export async function loadConfiguration(): Promise<ConfigurationInterface> {
  const config: ConfigurationInterface = {
    appPort: Number.parseInt(process.env.PORT) || 4200,

    jwt: {
      hashSaltLogRounds: Number.parseInt(process.env.HASH_SALT_LOG_ROUNDS),

      jwtAccessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || "secret",

      jwtRefreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || "secret",

      accessTokenExpiration:
        process.env.ACCESSTOKEN_TOKEN_EXPIRATION_TIME || "1h",

      refreshTokenExpiration:
        process.env.REFRESHTOKEN_TOKEN_EXPIRATION_TIME || "1d",
    },

    pg: {
      host: process.env.DATABASE_HOST || "localhost",

      port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,

      database: process.env.DATABASE_NAME || "study_eng",

      user: process.env.DATABASE_USER || "postgres",

      password: process.env.DATABASE_PASSWORD || "password",
    },
  };

  return config;
}
