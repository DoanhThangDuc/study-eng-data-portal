"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    const hasTable = await knex.schema.hasTable("User");
    if (hasTable)
        return;
    await knex.raw(`
    CREATE TABLE IF NOT EXISTS public."User" (
      "id" UUID PRIMARY KEY,
      "emailAddress" VARCHAR(255) NOT NULL UNIQUE,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      "emailAddressVerified" BOOLEAN NOT NULL DEFAULT FALSE,
      "administrator" BOOLEAN NOT NULL DEFAULT FALSE,
      "enabled" BOOLEAN NOT NULL DEFAULT TRUE,
      "passwordHashAlgorithm" VARCHAR(255),
      "passwordHash" VARCHAR(255),
      "passwordHashSalt" VARCHAR(255),
      "password" VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
async function down(knex) {
    await knex.raw(`
    DROP TABLE IF EXISTS public."User";
  `);
}
//# sourceMappingURL=20240825071350_createUserTable.js.map