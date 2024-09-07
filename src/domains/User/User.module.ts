import { Module } from "@nestjs/common";
import { UserController } from "../../entrypoints/User.controller";
import { UserRegisterInteractor } from "./UserRegisterInteractor";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserRegisterAction } from "./actions/UserRegisterAction";

@Module({
  imports: [InfrastructureModule],
  controllers: [UserController],
  providers: [UserRegisterInteractor, UserRegisterAction],
})
export class UserModule {}
