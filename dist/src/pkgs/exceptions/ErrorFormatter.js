"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFormatter = void 0;
const common_1 = require("@nestjs/common");
class ErrorFormatter {
    execute(exception) {
        if (exception instanceof common_1.BadRequestException) {
            const errorResponse = exception.getResponse().message;
            return {
                debugMessage: "You have an error in your request's body. Check 'fieldErrors' field for more details!",
                status: "ERROR",
                type: exception.message,
                fieldErrors: errorResponse,
            };
        }
        return {
            debugMessage: exception.getResponse().message,
            options: exception.stack,
            status: "ERROR",
            type: exception.getResponse().error,
        };
    }
}
exports.ErrorFormatter = ErrorFormatter;
//# sourceMappingURL=ErrorFormatter.js.map