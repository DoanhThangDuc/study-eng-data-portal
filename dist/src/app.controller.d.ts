import { ConfigService } from "@nestjs/config";
export declare class AppController {
    private readonly congfigService;
    constructor(congfigService: ConfigService);
    getHello(): {
        message: string;
    };
}
