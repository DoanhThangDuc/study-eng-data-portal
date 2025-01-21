import { UserSignInAction } from "./UserSignInAction";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { InteractorContext } from "../../InteractorContext";
import { TokenUser } from "../../TokenUser";
export declare class UserSignInInteractor {
    private readonly userSignInAction;
    constructor(userSignInAction: UserSignInAction);
    execute(context: InteractorContext, payload: UserSignInPayloadDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userResponse: TokenUser;
    }>;
}
