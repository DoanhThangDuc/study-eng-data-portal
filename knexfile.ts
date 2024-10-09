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

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

module.exports = config;
