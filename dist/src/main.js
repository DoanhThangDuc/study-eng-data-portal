"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const createApp_1 = require("./infrastructure/createApp");
async function bootstrapApp() {
    const app = await (0, createApp_1.createApp)();
    const configService = app.get(config_1.ConfigService);
    const appPort = configService.get("appPort") || 3000;
    await app.listen(appPort, () => {
        common_1.Logger.log(`The app is running locally on port: ${appPort}\nNODE_ENV: ${process.env.NODE_ENV}`);
    });
}
bootstrapApp();
//# sourceMappingURL=main.js.map