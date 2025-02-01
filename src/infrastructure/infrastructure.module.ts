import { Module } from "@nestjs/common";
import { KyselyReaderService } from "./KyselyReaderService.provider";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DB } from "../db/types";
import { JwtStrategy } from "./JwtStrategy.provider";
import { appConfigs } from "../pkgs/config/AppConfigs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./JwtAuthGuard.provider";
import { loadConfiguration } from "../pkgs/config/loadConfiguration";
@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
      envFilePath: [".env"],
    }),
    PassportModule,
    JwtModule.register({
      secret: appConfigs.jwtAccessTokenSecret,
      signOptions: { expiresIn: appConfigs.accessTokenExpiresIn },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: KyselyReaderService,
      useFactory: (configService: ConfigService) => {
        return new KyselyReaderService<DB>(configService);
      },
      inject: [ConfigService],
    },
    JwtStrategy,
  ],
  exports: [KyselyReaderService, JwtModule, PassportModule],
})
export class InfrastructureModule {}
