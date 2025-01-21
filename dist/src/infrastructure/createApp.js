"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const IllegalStateError_1 = require("../pkgs/errors/IllegalStateError");
const ErrorFormatter_1 = require("../pkgs/exceptions/ErrorFormatter");
const GlobalException_1 = require("../pkgs/exceptions/GlobalException");
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.enableCors();
    const errorFormatter = new ErrorFormatter_1.ErrorFormatter();
    const configService = app.get(config_1.ConfigService);
    const appPort = configService.get("appPort");
    if (!appPort) {
        throw new IllegalStateError_1.IllegalStateError("AppPort key is required");
    }
    app.useGlobalFilters(new GlobalException_1.GlobalException(errorFormatter));
    return app;
}
//# sourceMappingURL=createApp.js.map