export declare class ErrorFormatter {
    execute(exception: any): {
        debugMessage: string;
        status: string;
        type: string;
        fieldErrors: any;
        options?: undefined;
    } | {
        debugMessage: any;
        options: any;
        status: string;
        type: any;
        fieldErrors?: undefined;
    };
}
