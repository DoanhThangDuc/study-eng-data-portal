import type { Knex } from "knex";
import { appConfigs } from "./src/pkgs/config/AppConfigs";

const baseConfig: Knex.Config = {
  client: appConfigs.pgClient,
  connection: {
    host: appConfigs.pgHost,
    port: appConfigs.pgPort,
    user: appConfigs.pgUser,
    password: appConfigs.pgPass,
    database: appConfigs.pgDbName,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/knexMigrations",
  },
};

appConfigs.setup();
const config: { [key: string]: Knex.Config } = {
  development: {
    ...baseConfig,
  },

  staging: {
    ...baseConfig,
    pool: {
      min: appConfigs.minPool,
      max: appConfigs.maxPool,
    },
  },
};

module.exports = config;
