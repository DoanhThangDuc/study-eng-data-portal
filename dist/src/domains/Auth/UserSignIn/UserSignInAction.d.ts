import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { DB } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { InteractorContext } from "../../InteractorContext";
import { PasswordHasher } from "../actions/PasswordHasher";
import { TokenGenerator } from "../actions/TokenGenerator";
import { TokenUser } from "../../TokenUser";
export declare class UserSignInAction {
    private readonly tokenGenerator;
    private readonly kyselyReaderService;
    private readonly passwordHasher;
    constructor(tokenGenerator: TokenGenerator, kyselyReaderService: KyselyReaderService<DB>, passwordHasher: PasswordHasher);
    execute(context: InteractorContext, payload: UserSignInPayloadDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userResponse: TokenUser;
    }>;
    getUserResponse(emailAddress: string): Promise<TokenUser & {
        passwordHash: string;
    }>;
}
