import { HttpError } from "routing-controllers";
export declare class InvalidCredentialsError extends HttpError {
    constructor(message: string);
    toJSON(): Record<string, string | Record<string, string>>;
}
