import { Module } from "@nestjs/common";
import { AuthController } from "../../entrypoints/Auth.controller";
import { UserRegisterInteractor } from "./UserRegister/UserRegisterInteractor";
import { UserRegisterAction } from "./UserRegister/UserRegisterAction";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserSignInAction } from "./UserSignIn/UserSignInAction";
import { UserSignInInteractor } from "./UserSignIn/UserSignInInteractor";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [
    UserRegisterInteractor,
    UserRegisterAction,
    UserSignInInteractor,
    UserSignInAction,
  ],
})
export class AuthModule {}
