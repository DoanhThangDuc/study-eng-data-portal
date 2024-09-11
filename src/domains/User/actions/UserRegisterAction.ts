import { DB, User } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { EmailExistsError } from "../../../pkgs/errors/EmailExistsError";
import { UserCreatePayloadDto } from "../dtos/UserCreatePayloadDto";
import { v4 as uuidv4 } from "uuid";
import { PasswordHasher } from "./PasswordHasher";
import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";
import { ConfigService } from "@nestjs/config";
import { ConfigurationInterface } from "../../../pkgs/config/ConfigurationInterface";
import { generateAccessToken, TokenUser } from "../../TokenUser";

@Injectable()
export class UserRegisterAction {
  constructor(
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private configService: ConfigService,
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

    const rounds =
      this.configService.get<ConfigurationInterface>(
        "config",
      ).hashSaltLogRounds;

    const { hash, salt, algorithm } = await new PasswordHasher(rounds).hash(
      payload.preHashedPassword,
    );

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
      administrator: createdUser.administrator,
      enabled: createdUser.enabled,
    };

    const { accessToken } = generateAccessToken(
      tokenUser,
      this.configService.get<ConfigurationInterface>("config").jwtSecret,
      this.configService.get<ConfigurationInterface>("config").expiresIn,
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

  generateAccessToken(
    tokenUser: any,
    jwtSecret: string,
    expiresIn: string,
  ): { accessToken: string } {
    const token = jwt.sign(tokenUser, jwtSecret, {
      algorithm: "HS256",
      header: {
        authorization: true,
      } as any,
      expiresIn,
    });
    return { accessToken: token };
  }
}
