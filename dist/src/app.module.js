"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const User_module_1 = require("./domains/User/User.module");
const app_controller_1 = require("./app.controller");
const LoggingMiddleware_1 = require("./middlewares/LoggingMiddleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(LoggingMiddleware_1.LoggingMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [User_module_1.UserModule, infrastructure_module_1.InfrastructureModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map