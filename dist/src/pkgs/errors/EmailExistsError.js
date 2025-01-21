"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistsError = void 0;
const common_1 = require("@nestjs/common");
const routing_controllers_1 = require("routing-controllers");
class EmailExistsError extends routing_controllers_1.HttpError {
    constructor() {
        super(common_1.HttpStatus.CONFLICT);
        Object.setPrototypeOf(this, EmailExistsError.prototype);
    }
    toJSON() {
        return {
            type: "EmailExists",
            options: this.stack,
            status: "ERROR",
            debugMessage: "This email address is already being used",
        };
    }
}
exports.EmailExistsError = EmailExistsError;
//# sourceMappingURL=EmailExistsError.js.map