import { ConfigService } from "@nestjs/config";
export type PasswordHashResult = {
    hash: string;
    salt: string;
    algorithm: "bcrypt";
};
export declare class PasswordHasher {
    private readonly congfigService;
    constructor(congfigService: ConfigService);
    hash(preHashedPassword: string): Promise<PasswordHashResult>;
    comparePassword(preHashedPassword: string, hash: string): Promise<void>;
}
