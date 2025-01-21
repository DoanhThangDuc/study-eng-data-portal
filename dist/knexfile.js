"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppConfigs_1 = require("./src/pkgs/config/AppConfigs");
const baseConfig = {
    client: AppConfigs_1.appConfigs.pgClient,
    connection: {
        host: AppConfigs_1.appConfigs.pgHost,
        port: AppConfigs_1.appConfigs.pgPort,
        user: AppConfigs_1.appConfigs.pgUser,
        password: AppConfigs_1.appConfigs.pgPass,
        database: AppConfigs_1.appConfigs.pgDbName,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/knexMigrations",
    },
};
AppConfigs_1.appConfigs.setup();
const config = {
    development: {
        ...baseConfig,
    },
    staging: {
        ...baseConfig,
        pool: {
            min: AppConfigs_1.appConfigs.minPool,
            max: AppConfigs_1.appConfigs.maxPool,
        },
    },
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map