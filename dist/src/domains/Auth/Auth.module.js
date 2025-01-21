"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const Auth_controller_1 = require("../../entrypoints/Auth.controller");
const UserSignUpInteractor_1 = require("./UserSignUp/UserSignUpInteractor");
const UserSignUpAction_1 = require("./UserSignUp/UserSignUpAction");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const UserSignInAction_1 = require("./UserSignIn/UserSignInAction");
const UserSignInInteractor_1 = require("./UserSignIn/UserSignInInteractor");
const passport_1 = require("@nestjs/passport");
const PasswordHasher_1 = require("./actions/PasswordHasher");
const TokenGenerator_1 = require("./actions/TokenGenerator");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule, passport_1.PassportModule],
        controllers: [Auth_controller_1.AuthController],
        providers: [
            UserSignUpInteractor_1.UserSignUpInteractor,
            UserSignUpAction_1.UserSignUpAction,
            UserSignInInteractor_1.UserSignInInteractor,
            UserSignInAction_1.UserSignInAction,
            PasswordHasher_1.PasswordHasher,
            TokenGenerator_1.TokenGenerator,
        ],
    })
], AuthModule);
//# sourceMappingURL=Auth.module.js.map