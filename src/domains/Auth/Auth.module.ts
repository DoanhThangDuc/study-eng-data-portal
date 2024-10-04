import { Module } from "@nestjs/common";
import { AuthController } from "../../entrypoints/Auth.controller";
import { UserRegisterInteractor } from "./UserRegister/UserRegisterInteractor";
import { UserRegisterAction } from "./UserRegister/UserRegisterAction";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserSignInAction } from "./UserSignIn/UserSignInAction";
import { UserSignInInteractor } from "./UserSignIn/UserSignInInteractor";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [InfrastructureModule, PassportModule],
  controllers: [AuthController],
  providers: [
    UserRegisterInteractor,
    UserRegisterAction,
    UserSignInInteractor,
    UserSignInAction,
    LocalStrategy,
  ],
})
export class AuthModule {}
