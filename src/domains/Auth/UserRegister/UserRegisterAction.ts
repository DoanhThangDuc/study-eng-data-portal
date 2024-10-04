import { DB, User } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { EmailExistsError } from "../../../pkgs/errors/EmailExistsError";
import { v4 as uuidv4 } from "uuid";
import { PasswordHasher } from "../actions/PasswordHasher";
import { Injectable } from "@nestjs/common";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";
import { generateAccessToken, TokenUser } from "../../TokenUser";
import { AppConfigsEnvironment } from "../../../pkgs/config/AppConfigsEnvironment";
import { UserCreatePayloadDto } from "./UserCreatePayloadDto";

@Injectable()
export class UserRegisterAction {
  constructor(
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private appConfigs: AppConfigsEnvironment,
  ) {}
  async execute(payload: UserCreatePayloadDto): Promise<{
    accessToken: string;
    refreshToken: string;
    userResponse: TokenUser;
  }> {
    // TODO: need to use passport or other way to check if user is existing

    const emailAddress = payload.emailAddress.toLowerCase();

    await this.checkEmailExists(emailAddress);
    const userId = uuidv4();

    const { hash, salt, algorithm } = await new PasswordHasher(
      this.appConfigs.hashSaltLogRounds,
    ).hash(payload.preHashedPassword);

    const userInput: Partial<User> = {
      id: userId,
      emailAddress,
      firstName: payload.firstName,
      lastName: payload.lastName,
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
      emailAddressVerified: createdUser.emailAddressVerified,
      emailAddress: createdUser.emailAddress,
      administrator: createdUser.administrator,
      enabled: createdUser.enabled,
    };

    const { accessToken } = generateAccessToken(
      tokenUser,
      this.appConfigs.jwtSecret,
      this.appConfigs.expiresIn,
    );

    return {
      userResponse: tokenUser,
      accessToken,
      refreshToken: "string",
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
