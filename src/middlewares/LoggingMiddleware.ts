import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { AppRequest } from "../domains/InteractorContext";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction): void {
    const requestId = req.headers["x-request-id"] || uuidv4();

    req.requestId = requestId;
    req.logger = new Logger(`[Request ID: ${requestId}]`);

    req.logger.log(
      `[${req.method}] ${req.originalUrl} - Request ID: ${requestId}`,
    );

    const startTime = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      req.logger.log(
        `[${req.method}] ${req.originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
}
