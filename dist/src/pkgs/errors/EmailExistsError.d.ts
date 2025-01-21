import { HttpError } from "routing-controllers";
export declare class EmailExistsError extends HttpError {
    constructor();
    toJSON(): Record<string, string | Record<string, string>>;
}
