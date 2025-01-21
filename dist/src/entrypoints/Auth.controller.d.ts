import { UserSignUpPayloadDto } from "../domains/Auth/UserSignUp/UserSignUpPayloadDto";
import { UserSignUpInteractor } from "../domains/Auth/UserSignUp/UserSignUpInteractor";
import { UserSignInPayloadDto } from "../domains/Auth/dtos/UserSignInPayloadDto";
import { UserSignInInteractor } from "../domains/Auth/UserSignIn/UserSignInInteractor";
import { AppRequest } from "../domains/InteractorContext";
import { Response } from "express";
export declare class AuthController {
    private userSignUpInteractor;
    private userSignInInteractor;
    constructor(userSignUpInteractor: UserSignUpInteractor, userSignInInteractor: UserSignInInteractor);
    userSignUp(payload: UserSignUpPayloadDto, request: AppRequest): Promise<{
        accessToken: string;
        refreshToken: string;
        userResponse: import("../domains/TokenUser").TokenUser;
    }>;
    userSignIn(request: AppRequest, response: Response, payload: UserSignInPayloadDto): Promise<Response<any, Record<string, any>>>;
    getStatus(request: AppRequest): import("../domains/TokenUser").TokenUser;
}
