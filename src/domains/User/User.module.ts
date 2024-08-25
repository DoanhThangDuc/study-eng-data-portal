import { Module } from "@nestjs/common";
import { UserController } from "../../entrypoints/User.controller";
import { UserRegisterInteractor } from "./UserRegisterInteractor";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  controllers: [UserController],
  providers: [UserRegisterInteractor],
})
export class UserModule {}
