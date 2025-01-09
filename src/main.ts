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

async function createApp() {
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

  return app;
}

async function bootstrapLocal() {
  const app = await createApp();

  const configService = app.get<ConfigService>(ConfigService);
  const appPort =
    configService.get<ConfigurationInterface["appPort"]>("appPort") || 3000;

  await app.listen(appPort, () => {
    Logger.log(
      `The app is running locally on port: ${appPort}\nNODE_ENV: ${process.env.NODE_ENV}`,
    );
  });
}

// Local development mode
// Local development mode
if (process.env.NODE_ENV === "development") {
  bootstrapLocal();
}

async function bootstrapLambda() {
  const app = await createApp();

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

// AWS Lambda mode
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapLambda());
  return server(event, context, callback);
};
