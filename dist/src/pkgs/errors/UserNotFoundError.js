"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const common_1 = require("@nestjs/common");
const routing_controllers_1 = require("routing-controllers");
class UserNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(common_1.HttpStatus.CONFLICT);
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }
    toJSON() {
        return {
            type: "UserNotFoundError",
            options: this.stack,
            status: "ERROR",
            debugMessage: "User not found",
        };
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=UserNotFoundError.js.map