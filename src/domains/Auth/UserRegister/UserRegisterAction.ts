import { DB, User } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { EmailExistsError } from "../../../pkgs/errors/EmailExistsError";
import { v4 as uuidv4 } from "uuid";
import { PasswordHasher } from "../actions/PasswordHasher";
import { Injectable } from "@nestjs/common";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";
import { TokenUser } from "../../TokenUser";
import { UserCreatePayloadDto } from "./UserCreatePayloadDto";
import { InteractorContext } from "../../InteractorContext";
import { TokenGenerator } from "../actions/TokenGenerator";

@Injectable()
export class UserRegisterAction {
  constructor(
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private readonly tokenGenerator: TokenGenerator,
    private readonly passwordHasher: PasswordHasher,
  ) {}
  async execute(
    context: InteractorContext,
    payload: UserCreatePayloadDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    userResponse: TokenUser;
  }> {
    const { user } = context;

    if (user) {
      throw new IllegalStateError("Can't upgrade not anonymous user");
    }

    const { firstName, lastName, preHashedPassword } = payload;
    const emailAddress = payload.emailAddress.toLowerCase();

    await this.checkEmailExists(emailAddress);
    const userId = uuidv4();

    const { hash, salt, algorithm } =
      await this.passwordHasher.hash(preHashedPassword);

    const userInput: Partial<User> = {
      id: userId,
      emailAddress,
      firstName: firstName,
      lastName: lastName,
      passwordHashAlgorithm: algorithm,
      passwordHash: hash,
      passwordHashSalt: salt,
    };

    const createdUser = await this.createUser(userInput);
    if (!createdUser) {
      throw new IllegalStateError("User should be created");
    }

    const tokenUser: TokenUser = {
      id: createdUser.id,
      emailAddress: createdUser.emailAddress,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      emailAddressVerified: createdUser.emailAddressVerified,
      administrator: createdUser.administrator,
      enabled: createdUser.enabled,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenGenerator.generateAccessToken(tokenUser),
      this.tokenGenerator.generateRefreshToken({ userId: tokenUser.id }),
    ]);

    return {
      userResponse: tokenUser,
      accessToken,
      refreshToken,
    };
  }

  async checkEmailExists(emailAddress: string) {
    const result = await this.kyselyReaderService
      .selectFrom("User")
      .select("User.emailAddress")
      .where("User.emailAddress", "=", emailAddress.toLowerCase())
      .execute();

    if (result.length === 0) {
      return;
    }

    throw new EmailExistsError();
  }

  async createUser(payload: Partial<User>): Promise<User> {
    const user = await this.kyselyReaderService
      .insertInto("User")
      .values(payload)
      .returning([
        "id",
        "emailAddress",
        "firstName",
        "lastName",
        "emailAddressVerified",
        "administrator",
        "enabled",
      ])
      .executeTakeFirstOrThrow();

    return user;
  }
}
