import { registerAs } from "@nestjs/config";
import { ConfigurationInterface } from "./ConfigurationInterface";

export default registerAs("config", () => {
  const configuration: ConfigurationInterface = {
    pg: {
      host: process.env.DATABASE_HOST || "localhost",
      port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_URL || "study_eng",
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "password",
    },
  };

  return configuration;
});
