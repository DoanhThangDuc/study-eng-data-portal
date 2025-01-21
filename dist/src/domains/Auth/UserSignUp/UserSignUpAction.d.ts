import { DB, User } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { PasswordHasher } from "../actions/PasswordHasher";
import { TokenUser } from "../../TokenUser";
import { UserSignUpPayloadDto } from "./UserSignUpPayloadDto";
import { InteractorContext } from "../../InteractorContext";
import { TokenGenerator } from "../actions/TokenGenerator";
export declare class UserSignUpAction {
    private readonly kyselyReaderService;
    private readonly tokenGenerator;
    private readonly passwordHasher;
    constructor(kyselyReaderService: KyselyReaderService<DB>, tokenGenerator: TokenGenerator, passwordHasher: PasswordHasher);
    execute(context: InteractorContext, payload: UserSignUpPayloadDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userResponse: TokenUser;
    }>;
    checkEmailExists(emailAddress: string): Promise<void>;
    createUser(payload: Partial<User>): Promise<User>;
}
