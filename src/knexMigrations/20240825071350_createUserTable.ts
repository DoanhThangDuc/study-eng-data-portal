import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable("User");
  if (hasTable) return;

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public."User" (
      "id" UUID PRIMARY KEY,
      "emailAddress" VARCHAR(255) NOT NULL UNIQUE,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      "passwordHashAlgorithm" VARCHAR(255),
      "passwordHash" VARCHAR(255),
      "passwordHashSalt" VARCHAR(255),
      "password" VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS public."User";
  `);
}
