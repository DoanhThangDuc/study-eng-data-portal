import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";
import { HttpError } from "routing-controllers";
import { ErrorFormatter } from "./ErrorFormatter";

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly errorFormatter: ErrorFormatter,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

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
  }
  sendResponse(
    context: HttpArgumentsHost,
    content: { body: any; status: number },
  ) {
    const response = context.getResponse<Response>();
    response.status(content.status).json(content.body);
  }
}
