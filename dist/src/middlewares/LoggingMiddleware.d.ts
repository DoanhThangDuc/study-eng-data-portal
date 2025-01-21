import { NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { AppRequest } from "../domains/InteractorContext";
export declare class LoggingMiddleware implements NestMiddleware {
    use(req: AppRequest, res: Response, next: NextFunction): void;
}
