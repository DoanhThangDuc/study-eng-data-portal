import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ErrorFormatter } from "./ErrorFormatter";
export declare class GlobalException implements ExceptionFilter {
    private readonly errorFormatter;
    constructor(errorFormatter: ErrorFormatter);
    catch(exception: unknown, host: ArgumentsHost): void;
    sendResponse(context: HttpArgumentsHost, content: {
        body: any;
        status: number;
    }): void;
}
