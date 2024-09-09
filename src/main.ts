import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { appConfigs } from "./pkgs/config/AppConfigs";

appConfigs.setup();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(appConfigs.port, () => {
    console.log(`The app is running on port ${appConfigs.port}`);
  });
}

bootstrap();
