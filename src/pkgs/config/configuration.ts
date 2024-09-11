import { registerAs } from "@nestjs/config";
import { ConfigurationInterface } from "./ConfigurationInterface";

export default registerAs("config", () => {
  const configuration: ConfigurationInterface = {
    port: Number.parseInt(process.env.PORT) || 4200,
    hashSaltLogRounds: Number.parseInt(process.env.HASH_SALT_LOG_ROUNDS) || 10,
    pg: {
      host: process.env.DATABASE_HOST || "localhost",
      port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_NAME || "study_eng",
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "password",
    },
  };

  return configuration;
});
