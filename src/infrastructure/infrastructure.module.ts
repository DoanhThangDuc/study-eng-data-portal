import { Module } from "@nestjs/common";
import { KyselyReaderService } from "./KyselyReaderService.provider";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DB } from "../db/types";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [
    {
      provide: KyselyReaderService,
      useFactory: (configService: ConfigService) => {
        return new KyselyReaderService<DB>(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [KyselyReaderService],
})
export class InfrastructureModule {}
