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
exports.PasswordHasher = void 0;
const bcrypt = require("bcrypt");
const InvalidCredentialsError_1 = require("../../../pkgs/errors/InvalidCredentialsError");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PasswordHasher = class PasswordHasher {
    constructor(congfigService) {
        this.congfigService = congfigService;
    }
    async hash(preHashedPassword) {
        const salt = await bcrypt.genSalt(this.congfigService.get("jwt.hashSaltLogRounds"));
        const hash = await bcrypt.hash(preHashedPassword, salt);
        return {
            hash,
            salt,
            algorithm: "bcrypt",
        };
    }
    async comparePassword(preHashedPassword, hash) {
        const compareResult = await bcrypt.compare(preHashedPassword, hash);
        if (!compareResult) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError("Passwords do not match");
        }
    }
};
exports.PasswordHasher = PasswordHasher;
exports.PasswordHasher = PasswordHasher = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PasswordHasher);
//# sourceMappingURL=PasswordHasher.js.map