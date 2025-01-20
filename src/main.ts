import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { ConfigurationInterface } from "./pkgs/config/ConfigurationInterface";
import { createApp } from "./infrastructure/createApp";

async function bootstrapApp() {
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

bootstrapApp();
