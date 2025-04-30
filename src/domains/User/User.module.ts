import { Module } from "@nestjs/common";
import { UserController } from "../../entrypoints/User.controller";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { AuthModule } from "../Auth/Auth.module";
import { UserGetMeInteractor } from "../Auth/UserGetMe/UserGetMeInteractor";

@Module({
  imports: [InfrastructureModule, AuthModule],
  controllers: [UserController],
  providers: [UserGetMeInteractor],
})
export class UserModule {}
