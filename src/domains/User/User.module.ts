import { Module } from "@nestjs/common";
import { UserController } from "../../entrypoints/User.controller";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { AuthModule } from "../Auth/Auth.module";

@Module({
  imports: [InfrastructureModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
