import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Callback, Context, Handler } from "aws-lambda";
import serverlessExpress from "@vendia/serverless-express";
import { Logger } from "@nestjs/common";
import { ErrorFormatter } from "./pkgs/exceptions/ErrorFormatter";
import { ConfigurationInterface } from "./pkgs/config/ConfigurationInterface";
import { IllegalStateError } from "./pkgs/errors/IllegalStateError";
import { GlobalException } from "./pkgs/exceptions/GlobalException";

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  const errorFormatter = new ErrorFormatter();

  const configService = app.get<ConfigService>(ConfigService);
  const appPort =
    configService.get<ConfigurationInterface["appPort"]>("appPort");

  if (!appPort) {
    throw new IllegalStateError("AppPort key is required");
  }

  app.useGlobalFilters(new GlobalException(errorFormatter));

  await app.listen(appPort, () => {
    Logger.log(
      `The app is running on port: ${appPort}\nNODE_ENV: ${process.env.NODE_ENV}`,
    );
  });

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
