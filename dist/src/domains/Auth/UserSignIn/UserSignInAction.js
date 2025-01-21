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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignInAction = void 0;
const common_1 = require("@nestjs/common");
const KyselyReaderService_provider_1 = require("../../../infrastructure/KyselyReaderService.provider");
const PasswordHasher_1 = require("../actions/PasswordHasher");
const TokenGenerator_1 = require("../actions/TokenGenerator");
let UserSignInAction = class UserSignInAction {
    constructor(tokenGenerator, kyselyReaderService, passwordHasher) {
        this.tokenGenerator = tokenGenerator;
        this.kyselyReaderService = kyselyReaderService;
        this.passwordHasher = passwordHasher;
    }
    async execute(context, payload) {
        const userResponse = await this.getUserResponse(payload.emailAddress);
        if (!userResponse) {
            throw new common_1.UnauthorizedException("User not found!");
        }
        const { passwordHash, ...user } = userResponse;
        await this.passwordHasher.comparePassword(payload.password, passwordHash);
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenGenerator.generateAccessToken(userResponse),
            this.tokenGenerator.generateRefreshToken({ userId: userResponse.id }),
        ]);
        context.user = user;
        return {
            userResponse: user,
            accessToken,
            refreshToken,
        };
    }
    async getUserResponse(emailAddress) {
        const [userResponse] = await this.kyselyReaderService
            .selectFrom("User")
            .select("User.id")
            .select("User.emailAddress")
            .select("User.firstName")
            .select("User.lastName")
            .select("User.emailAddressVerified")
            .select("User.administrator")
            .select("User.enabled")
            .select("User.passwordHash")
            .where("User.emailAddress", "=", emailAddress.toLowerCase())
            .execute();
        if (!userResponse)
            return null;
        return userResponse;
    }
};
exports.UserSignInAction = UserSignInAction;
exports.UserSignInAction = UserSignInAction = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [TokenGenerator_1.TokenGenerator,
        KyselyReaderService_provider_1.KyselyReaderService,
        PasswordHasher_1.PasswordHasher])
], UserSignInAction);
//# sourceMappingURL=UserSignInAction.js.map