"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const KyselyReaderService_provider_1 = require("./KyselyReaderService.provider");
const config_1 = require("@nestjs/config");
const JwtStrategy_provider_1 = require("./JwtStrategy.provider");
const AppConfigs_1 = require("../pkgs/config/AppConfigs");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const JwtAuthGuard_provider_1 = require("./JwtAuthGuard.provider");
const loadConfiguration_1 = require("../pkgs/config/loadConfiguration");
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                load: [loadConfiguration_1.loadConfiguration],
                isGlobal: true,
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: AppConfigs_1.appConfigs.jwtAccessSecret,
                signOptions: { expiresIn: AppConfigs_1.appConfigs.accessTokenExpiresIn },
            }),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: JwtAuthGuard_provider_1.JwtAuthGuard,
            },
            {
                provide: KyselyReaderService_provider_1.KyselyReaderService,
                useFactory: (configService) => {
                    return new KyselyReaderService_provider_1.KyselyReaderService(configService);
                },
                inject: [config_1.ConfigService],
            },
            JwtStrategy_provider_1.JwtStrategy,
        ],
        exports: [KyselyReaderService_provider_1.KyselyReaderService, jwt_1.JwtModule, passport_1.PassportModule],
    })
], InfrastructureModule);
//# sourceMappingURL=infrastructure.module.js.map