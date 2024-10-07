import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { DB } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { InteractorContext } from "../../InteractorContext";
import { PasswordHasher } from "../actions/PasswordHasher";
import { TokenGenerator } from "../actions/TokenGenerator";
import { TokenUser } from "../../TokenUser";

@Injectable()
export class UserSignInAction {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    context: InteractorContext,
    payload: UserSignInPayloadDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    userResponse: TokenUser;
  }> {
    const userResponse = await this.getUserResponse(payload.emailAddress);

    if (!userResponse) {
      throw new UnauthorizedException("User not found!");
    }

    await this.passwordHasher.comparePassword(
      payload.password,
      userResponse.passwordHash,
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenGenerator.generateAccessToken(userResponse),
      this.tokenGenerator.generateRefreshToken({ userId: userResponse.id }),
    ]);

    context.user = userResponse;

    return {
      userResponse: userResponse,
      accessToken,
      refreshToken,
    };
  }

  async getUserResponse(emailAddress: string): Promise<
    TokenUser & {
      passwordHash: string;
    }
  > {
    const [userResponse] = await this.kyselyReaderService
      .selectFrom("User")
      .select("User.id")
      .select("User.emailAddress")
      .select("User.firstName")
      .select("User.lastName")
      .select("User.emailAddressVerified")
      .select("User.administrator")
      .select("User.enabled")
      .select("User.passwordHash")
      .select("User.passwordHash")
      .where("User.emailAddress", "=", emailAddress.toLowerCase())
      .execute();

    if (!userResponse) return null;

    return userResponse;
  }
}
