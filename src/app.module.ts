import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { UserModule } from "./domains/User/User.module";

@Module({
  imports: [UserModule, InfrastructureModule],
})
export class AppModule {}
