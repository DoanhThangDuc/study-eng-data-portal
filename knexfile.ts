import * as dotenv from "dotenv";
import { Knex } from "knex";

console.log("Current working directory:", process.cwd());
dotenv.config({ path: "/home/ec2-user/study_english_data_portal/.env" });
console.log("Environment Variables:");
console.log("DATABASE_HOST:", process.env.DATABASE_HOST);
console.log("DATABASE_PORT:", process.env.DATABASE_PORT);

const baseConfig: Knex.Config = {
  client: process.env.DATABASE_CLIENT || "postgres",
  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER || "postgres",
    password: String(process.env.DATABASE_PASSWORD) || "password",
    database: process.env.DATABASE_NAME || "study_eng",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/knexMigrations",
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...baseConfig,
  },

  staging: {
    ...baseConfig,
    pool: {
      min: Number.parseInt(process.env.MIN_POOL) || 2,
      max: Number.parseInt(process.env.MAX_POOL) || 10,
    },
  },
};

module.exports = config;
