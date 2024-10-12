import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalException } from "./pkgs/exceptions/GlobalException";
import { ErrorFormatter } from "./pkgs/exceptions/ErrorFormatter";
import { ConfigService } from "@nestjs/config";
import { ConfigurationInterface } from "./pkgs/config/ConfigurationInterface";
import { IllegalStateError } from "./pkgs/errors/IllegalStateError";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const errorFormatter = new ErrorFormatter();
  const appPort = app
    .get<ConfigService>(ConfigService)
    .get<ConfigurationInterface["appPort"]>("appPort");

  if (!appPort) {
    throw new IllegalStateError("AppPort key is required");
  }

  app.useGlobalFilters(new GlobalException(httpAdapter, errorFormatter));

  await app.listen(appPort, () => {
    console.log(
      `The app is running on port: ${appPort}\nNODE_ENV: ${process.env.NODE_ENV}`,
    );
  });
}

bootstrap();
