import { UserSignUpPayloadDto } from "./UserSignUpPayloadDto";
import { UserSignUpAction } from "./UserSignUpAction";
import { InteractorContext } from "../../InteractorContext";
export declare class UserSignUpInteractor {
    private readonly userSignUpAction;
    constructor(userSignUpAction: UserSignUpAction);
    execute(context: InteractorContext, payload: UserSignUpPayloadDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userResponse: import("../../TokenUser").TokenUser;
    }>;
}
