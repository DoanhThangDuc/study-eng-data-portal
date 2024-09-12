import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { appConfigs } from "./pkgs/config/AppConfigs";
import { GlobalException } from "./pkgs/exceptions/GlobalException";

appConfigs.setup();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GlobalException(httpAdapter));

  await app.listen(appConfigs.port, () => {
    console.log(`The app is running on port ${appConfigs.port}`);
  });
}

bootstrap();
