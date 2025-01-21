"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const UserSignUpPayloadDto_1 = require("../domains/Auth/UserSignUp/UserSignUpPayloadDto");
const UserSignUpInteractor_1 = require("../domains/Auth/UserSignUp/UserSignUpInteractor");
const UserSignInPayloadDto_1 = require("../domains/Auth/dtos/UserSignInPayloadDto");
const UserSignInInteractor_1 = require("../domains/Auth/UserSignIn/UserSignInInteractor");
const IllegalStateError_1 = require("../pkgs/errors/IllegalStateError");
let AuthController = class AuthController {
    constructor(userSignUpInteractor, userSignInInteractor) {
        this.userSignUpInteractor = userSignUpInteractor;
        this.userSignInInteractor = userSignInInteractor;
    }
    userSignUp(payload, request) {
        return this.userSignUpInteractor.execute(request, payload);
    }
    async userSignIn(request, response, payload) {
        const { accessToken, refreshToken, userResponse } = await this.userSignInInteractor.execute(request, payload);
        response.setHeader("Authorization", accessToken);
        response.setHeader("RefreshToken", refreshToken);
        return response.status(200).json(userResponse);
    }
    getStatus(request) {
        if (!request.user) {
            throw new IllegalStateError_1.IllegalStateError("User not logged");
        }
        return request.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/auth/signup"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSignUpPayloadDto_1.UserSignUpPayloadDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "userSignUp", null);
__decorate([
    (0, common_1.Post)("/auth/signin"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, UserSignInPayloadDto_1.UserSignInPayloadDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userSignIn", null);
__decorate([
    (0, common_1.Get)("/auth/status"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getStatus", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("/v1"),
    __metadata("design:paramtypes", [UserSignUpInteractor_1.UserSignUpInteractor,
        UserSignInInteractor_1.UserSignInInteractor])
], AuthController);
//# sourceMappingURL=Auth.controller.js.map