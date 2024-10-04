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

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env.staging"],
    }),
    PassportModule,
    // JwtModule.register({
    //   secret: appConfigs.jwtSecret,
    //   signOptions: { expiresIn: appConfigs.expiresIn },
    // }),
  ],
  providers: [
    {
      provide: KyselyReaderService,
      useFactory: (configService: ConfigService) => {
        return new KyselyReaderService<DB>(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: AppConfigsEnvironment,
      useValue: appConfigs,
    },
    JwtStrategy,
  ],
  exports: [
    KyselyReaderService,
    AppConfigsEnvironment,
    // JwtModule,
    PassportModule,
  ],
})
export class InfrastructureModule {}
