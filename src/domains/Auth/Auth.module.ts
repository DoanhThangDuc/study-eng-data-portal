import { Module } from "@nestjs/common";
import { AuthController } from "../../entrypoints/Auth.controller";
import { UserSignUpInteractor } from "./UserSignUp/UserSignUpInteractor";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserSignInInteractor } from "./UserSignIn/UserSignInInteractor";
import { PassportModule } from "@nestjs/passport";
import { PasswordHasher } from "./actions/PasswordHasher";
import { TokenGenerator } from "./actions/TokenGenerator";

@Module({
  imports: [InfrastructureModule, PassportModule],
  controllers: [AuthController],
  providers: [
    UserSignUpInteractor,
    UserSignInInteractor,
    PasswordHasher,
    TokenGenerator,
  ],
})
export class AuthModule {}
