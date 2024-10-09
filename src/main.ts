import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { appConfigs } from "./pkgs/config/AppConfigs";
import { GlobalException } from "./pkgs/exceptions/GlobalException";
import { ErrorFormatter } from "./pkgs/exceptions/ErrorFormatter";

appConfigs.setup();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const errorFormatter = new ErrorFormatter();

  app.useGlobalFilters(new GlobalException(httpAdapter, errorFormatter));

  await app.listen(appConfigs.port, () => {
    console.log(
      `The app is running on port: ${appConfigs.port}\nNODE_ENV: ${process.env.NODE_ENV}`,
    );
  });
}

bootstrap();
