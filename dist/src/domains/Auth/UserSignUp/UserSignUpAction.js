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
exports.UserSignUpAction = void 0;
const KyselyReaderService_provider_1 = require("../../../infrastructure/KyselyReaderService.provider");
const EmailExistsError_1 = require("../../../pkgs/errors/EmailExistsError");
const uuid_1 = require("uuid");
const PasswordHasher_1 = require("../actions/PasswordHasher");
const common_1 = require("@nestjs/common");
const IllegalStateError_1 = require("../../../pkgs/errors/IllegalStateError");
const TokenGenerator_1 = require("../actions/TokenGenerator");
let UserSignUpAction = class UserSignUpAction {
    constructor(kyselyReaderService, tokenGenerator, passwordHasher) {
        this.kyselyReaderService = kyselyReaderService;
        this.tokenGenerator = tokenGenerator;
        this.passwordHasher = passwordHasher;
    }
    async execute(context, payload) {
        const { user } = context;
        if (user) {
            throw new IllegalStateError_1.IllegalStateError("Can't upgrade not anonymous user");
        }
        const { firstName, lastName, preHashedPassword } = payload;
        const emailAddress = payload.emailAddress.toLowerCase();
        await this.checkEmailExists(emailAddress);
        const userId = (0, uuid_1.v4)();
        const { hash, salt, algorithm } = await this.passwordHasher.hash(preHashedPassword);
        const userInput = {
            id: userId,
            emailAddress,
            firstName: firstName,
            lastName: lastName,
            passwordHashAlgorithm: algorithm,
            passwordHash: hash,
            passwordHashSalt: salt,
        };
        const createdUser = await this.createUser(userInput);
        if (!createdUser) {
            throw new IllegalStateError_1.IllegalStateError("User should be created");
        }
        const tokenUser = {
            id: createdUser.id,
            emailAddress: createdUser.emailAddress,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            emailAddressVerified: createdUser.emailAddressVerified,
            administrator: createdUser.administrator,
            enabled: createdUser.enabled,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenGenerator.generateAccessToken(tokenUser),
            this.tokenGenerator.generateRefreshToken({ userId: tokenUser.id }),
        ]);
        return {
            userResponse: tokenUser,
            accessToken,
            refreshToken,
        };
    }
    async checkEmailExists(emailAddress) {
        const result = await this.kyselyReaderService
            .selectFrom("User")
            .select("User.emailAddress")
            .where("User.emailAddress", "=", emailAddress.toLowerCase())
            .execute();
        if (result.length === 0) {
            return;
        }
        throw new EmailExistsError_1.EmailExistsError();
    }
    async createUser(payload) {
        const user = await this.kyselyReaderService
            .insertInto("User")
            .values(payload)
            .returning([
            "id",
            "emailAddress",
            "firstName",
            "lastName",
            "emailAddressVerified",
            "administrator",
            "enabled",
        ])
            .executeTakeFirstOrThrow();
        return user;
    }
};
exports.UserSignUpAction = UserSignUpAction;
exports.UserSignUpAction = UserSignUpAction = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [KyselyReaderService_provider_1.KyselyReaderService,
        TokenGenerator_1.TokenGenerator,
        PasswordHasher_1.PasswordHasher])
], UserSignUpAction);
//# sourceMappingURL=UserSignUpAction.js.map