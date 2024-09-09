import * as pg from "pg";
import { appConfigs } from "../src/pkgs/config/AppConfigs";

async function queryWithLog(client: pg.Client, command: string) {
  try {
    console.log("client.query", client.query);
    return await client.query(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function isDatabaseExisted(
  query: pg.Client,
  appDB: string,
): Promise<boolean> {
  const database = query.query(`SELECT datname 
FROM pg_database 
WHERE datname = ${process.env.DB_NAME};
`);

  console.log("process.env.DB_NAME", process.env.DB_NAME);

  return !!database;
}
export async function startApp() {
  console.time("setUpApp");

  appConfigs.setup();

  const client = new pg.Client({
    host: appConfigs.pgHost,
    port: appConfigs.pgPort,
    user: appConfigs.pgUser,
    password: appConfigs.pgPass,
    database: "postgres",
  });

  const DB = process.env.DATABASE_NAME || "";
  const bool = await isDatabaseExisted(client, DB);
  console.log("bool", bool);

  await queryWithLog(client, `DROP DATABASE IF EXISTS ${DB};`);
  // await queryWithLog(client, `CREATE DATABASE ${DB};`);

  // check if database already exists
  // drop database
}
