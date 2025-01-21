import { OnApplicationShutdown } from "@nestjs/common";
import { Kysely } from "kysely";
import { ConfigService } from "@nestjs/config";
export declare class KyselyReaderService<DB> extends Kysely<DB> implements OnApplicationShutdown {
    private pool;
    constructor(configService: ConfigService);
    onApplicationShutdown(): Promise<void>;
}
