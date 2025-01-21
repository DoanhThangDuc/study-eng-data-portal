"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const routing_controllers_1 = require("routing-controllers");
class InvalidCredentialsError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(401, message);
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
    }
    toJSON() {
        return {
            debugMessage: this.message,
            type: "InvalidCredentials",
            options: {},
            status: "ERROR",
        };
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=InvalidCredentialsError.js.map