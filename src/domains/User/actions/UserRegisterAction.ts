import { DB, User } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";
import { EmailExistsError } from "../../../pkgs/errors/EmailExistsError";
import { UserCreatePayloadDto } from "../dtos/UserCreatePayloadDto";
import { UserResponse } from "../dtos/UserResponseDto";
import { v4 as uuidv4 } from "uuid";
import { PasswordHasher } from "./PasswordHasher";
import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { IllegalStateError } from "../../../pkgs/errors/IllegalStateError";
import { ConfigService } from "@nestjs/config";
import { ConfigurationInterface } from "../../../pkgs/config/ConfigurationInterface";

@Injectable()
export class UserRegisterAction {
  constructor(
    private readonly kyselyReaderService: KyselyReaderService<DB>,
    private readonly configService: ConfigService,
  ) {}
  async execute(payload: UserCreatePayloadDto): Promise<{
    accessToken: string;
    refreshToken: string;
    userResponse?: UserResponse;
  }> {
    // TODO: need to use passport or other way to check
    const emailAddress = payload.emailAddress.toLowerCase();
    console.log(
      "process.env.HASH_SALT_LOG_ROUNDS",
      process.env.HASH_SALT_LOG_ROUNDS,
    );

    await this.checkEmailExists(emailAddress);
    const userId = uuidv4();

    // TODO: change this to env
    const rounds =
      this.configService.get<ConfigurationInterface>(
        "config",
      ).hashSaltLogRounds;

    const { hash, salt, algorithm } = await new PasswordHasher(10).hash(
      payload.preHashedPassword,
    );

    const userInput: User = {
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

    // TODO: learning more about duplicates vanity name and user id resolution

    return {
      accessToken: "string",
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

  async createUser(payload: User) {
    const user = await this.kyselyReaderService
      .insertInto("User")
      .values(payload)
      .returning(["id", "emailAddress", "firstName", "lastName"])
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
