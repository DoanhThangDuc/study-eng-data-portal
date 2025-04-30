import { Module } from "@nestjs/common";
import { AuthController } from "../../entrypoints/Auth.controller";
import { UserSignUpInteractor } from "./UserSignUp/UserSignUpInteractor";
import { UserSignUpAction } from "./UserSignUp/UserSignUpAction";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserSignInAction } from "./UserSignIn/UserSignInAction";
import { UserSignInInteractor } from "./UserSignIn/UserSignInInteractor";
import { PassportModule } from "@nestjs/passport";
import { PasswordHasher } from "./actions/PasswordHasher";
import { TokenGenerator } from "./actions/TokenGenerator";
import { UserGetMeInteractor } from "./UserGetMe/UserGetMeInteractor";

@Module({
  imports: [InfrastructureModule, PassportModule],
  controllers: [AuthController],
  providers: [
    UserSignUpInteractor,
    UserSignUpAction,
    UserSignInInteractor,
    UserGetMeInteractor,
    UserSignInAction,
    PasswordHasher,
    TokenGenerator,
  ],
})
export class AuthModule {}
