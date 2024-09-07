import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";
import { ConfigurationInterface } from "../pkgs/config/ConfigurationInterface";
@Injectable()
export class KyselyReaderService<DB>
  extends Kysely<DB>
  implements OnApplicationShutdown
{
  private pool: Pool;

  constructor(configService: ConfigService) {
    const config = configService.get<ConfigurationInterface>("config").pg;
    const poolPg = new Pool(config);

    super({
      dialect: new PostgresDialect({
        pool: poolPg,
      }),
    });

    this.pool = poolPg;
  }

  async onApplicationShutdown(): Promise<void> {
    this.pool.connect();
    try {
      await this.pool.end();
    } catch (error) {
      console.error(error);
    }
  }
}
