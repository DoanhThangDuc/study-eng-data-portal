"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalStateError = void 0;
const routing_controllers_1 = require("routing-controllers");
class IllegalStateError extends routing_controllers_1.HttpError {
    constructor(debugMessage) {
        super(500);
        this.debugMessage = debugMessage;
        Object.setPrototypeOf(this, IllegalStateError.prototype);
    }
    toJSON() {
        return {
            type: "IllegalState",
            options: this.stack,
            status: "ERROR",
            debugMessage: this.debugMessage,
        };
    }
}
exports.IllegalStateError = IllegalStateError;
//# sourceMappingURL=IllegalStateError.js.map