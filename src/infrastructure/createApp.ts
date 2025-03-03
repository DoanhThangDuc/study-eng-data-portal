import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { ConfigurationInterface } from "../pkgs/config/ConfigurationInterface";
import { IllegalStateError } from "../pkgs/errors/IllegalStateError";
import { ErrorFormatter } from "../pkgs/exceptions/ErrorFormatter";
import { GlobalException } from "../pkgs/exceptions/GlobalException";

export async function createApp() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: "*", 
    allowedHeaders: "Authorization, *",
    exposedHeaders: "Authorization,RefreshToken",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

  const errorFormatter = new ErrorFormatter();

  const configService = app.get<ConfigService>(ConfigService);

  const appPort =
    configService.get<ConfigurationInterface["appPort"]>("appPort");

  if (!appPort) {
    throw new IllegalStateError("AppPort key is required");
  }

  app.useGlobalFilters(new GlobalException(errorFormatter));

  return app;
}
