import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { UserModule } from "./domains/User/User.module";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [UserModule, InfrastructureModule],
})
export class AppModule {}
