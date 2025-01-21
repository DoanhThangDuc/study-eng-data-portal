"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAuthorizationTokenException = void 0;
const common_1 = require("@nestjs/common");
class InvalidAuthorizationTokenException extends common_1.HttpException {
    constructor() {
        super({
            status: "ERROR",
            type: "InvalidAuthorizationToken",
            debugMessage: "The Token's Signature resulted invalid",
            options: {},
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.InvalidAuthorizationTokenException = InvalidAuthorizationTokenException;
//# sourceMappingURL=InvalidAuthorizationTokenException.js.map