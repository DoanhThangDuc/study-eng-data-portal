import { HttpError } from "routing-controllers";
export declare class IllegalStateError extends HttpError {
    private debugMessage;
    constructor(debugMessage: string);
    toJSON(): Record<string, string | Record<string, string>>;
}
