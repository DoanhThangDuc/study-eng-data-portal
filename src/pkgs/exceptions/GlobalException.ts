import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";
import { HttpError } from "routing-controllers";
import { ErrorFormatter } from "./ErrorFormatter";
import { AppRequest } from "../../domains/InteractorContext";

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor(private readonly errorFormatter: ErrorFormatter) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    try {
      if (exception instanceof HttpError) {
        return this.sendResponse(context, {
          status: exception.httpCode,
          body: (exception as any).toJSON(),
        });
      }

      if (
        (exception as HttpException).getResponse() &&
        (exception as HttpException).getStatus()
      ) {
        return this.sendResponse(context, {
          status: (exception as HttpException).getStatus(),
          body: this.errorFormatter.execute(exception),
        });
      }
    } catch (err) {
      const errorResponse = {
        status: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
        debug: {
          errorMessage: err.message,
          stack: err.stack,
          originalException: {
            message: (exception as any).message,
            stack: (exception as any).stack,
          },
        },
      };

      return this.sendResponse(context, {
        status: 500,
        body: errorResponse,
      });
    }
  }
  sendResponse(
    context: HttpArgumentsHost,
    content: { body: any; status: number },
  ) {
    const response = context.getResponse<Response>();
    const { method, url, logger, requestId } = context.getRequest<AppRequest>();

    logger.error(
      `Request ${requestId} failed: [${method}] ${url} - Status: ${content.status}`,
      content.body,
    );

    response.status(content.status).json(content.body);
  }
}
