import { DB } from "../src/db/types";
import { KyselyReaderService } from "../src/infrastructure/KyselyReaderService.provider";

export async function deleteUserByEmail(
  client: KyselyReaderService<DB>,
  emails: string[],
) {
  for (const email of emails) {
    await client.deleteFrom("User").where("emailAddress", "=", email).execute();
  }
}
