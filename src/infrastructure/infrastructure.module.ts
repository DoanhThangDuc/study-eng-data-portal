import { Module } from "@nestjs/common";
import { KyselyReaderService } from "./KyselyReaderService.provider";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DB } from "../db/types";
import configuration from "../pkgs/config/configuration";
import { JwtStrategy } from "./JwtStrategy.provider";
import { appConfigs } from "../pkgs/config/AppConfigs";
import { AppConfigsEnvironment } from "../pkgs/config/AppConfigsEnvironment";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./JwtAuthGuard.provider";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env.staging"],
    }),
    PassportModule,
    JwtModule.register({
      secret: appConfigs.jwtAccessSecret,
      signOptions: { expiresIn: appConfigs.accessTokenExpiresIn },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: AppConfigsEnvironment,
      useValue: appConfigs,
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
  exports: [
    KyselyReaderService,
    AppConfigsEnvironment,
    JwtModule,
    PassportModule,
  ],
})
export class InfrastructureModule {}
