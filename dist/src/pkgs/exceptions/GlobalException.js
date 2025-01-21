"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalException = void 0;
const common_1 = require("@nestjs/common");
const routing_controllers_1 = require("routing-controllers");
const ErrorFormatter_1 = require("./ErrorFormatter");
let GlobalException = class GlobalException {
    constructor(errorFormatter) {
        this.errorFormatter = errorFormatter;
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        try {
            if (exception instanceof routing_controllers_1.HttpError) {
                return this.sendResponse(context, {
                    status: exception.httpCode,
                    body: exception.toJSON(),
                });
            }
            if (exception.getResponse() &&
                exception.getStatus()) {
                return this.sendResponse(context, {
                    status: exception.getStatus(),
                    body: this.errorFormatter.execute(exception),
                });
            }
        }
        catch (err) {
            const errorResponse = {
                status: 500,
                error: "Internal Server Error",
                message: "An unexpected error occurred.",
                debug: {
                    errorMessage: err.message,
                    stack: err.stack,
                    originalException: {
                        message: exception.message,
                        stack: exception.stack,
                    },
                },
            };
            return this.sendResponse(context, {
                status: 500,
                body: errorResponse,
            });
        }
    }
    sendResponse(context, content) {
        const response = context.getResponse();
        const { method, url, logger, requestId } = context.getRequest();
        logger.error(`Request ${requestId} failed: [${method}] ${url} - Status: ${content.status}`, content.body);
        response.status(content.status).json(content.body);
    }
};
exports.GlobalException = GlobalException;
exports.GlobalException = GlobalException = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [ErrorFormatter_1.ErrorFormatter])
], GlobalException);
//# sourceMappingURL=GlobalException.js.map