import { HttpError } from "routing-controllers";
export declare class UserNotFoundError extends HttpError {
    constructor();
    toJSON(): Record<string, string | Record<string, string>>;
}
