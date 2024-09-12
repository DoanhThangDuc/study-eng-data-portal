import * as pg from "pg";
import * as Knex from "knex";
import { appConfigs } from "../src/pkgs/config/AppConfigs";

async function queryWithLog(client: pg.Client, command: string) {
  try {
    return await client.query(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function migrateDatabase() {
  const knex = Knex({
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: "src/knexMigrations",
    },
  });

  // Run migrations
  await knex.migrate.latest();
  await knex.destroy();
}

export async function startApp(): Promise<{
  client: pg.Client;
}> {
  console.time("setUpApp");

  appConfigs.setup();

  const client = new pg.Client({
    host: appConfigs.pgHost,
    port: appConfigs.pgPort,
    database: "postgres",
    user: appConfigs.pgUser,
    password: appConfigs.pgPass,
  });

  await client.connect();

  const DB = process.env.DATABASE_NAME || "";

  // Delete database if it exists
  await queryWithLog(client, `DROP DATABASE IF EXISTS ${DB};`);

  // Create new database instance with empty data
  await queryWithLog(client, `CREATE DATABASE ${DB};`);

  await client.end();
  console.time("Database created successfully");

  // Migrate database
  await migrateDatabase();

  return {
    client,
  };
}
