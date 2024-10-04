import * as bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../../../pkgs/errors/InvalidCredentialsError";
import { Injectable } from "@nestjs/common";
import { AppConfigsEnvironment } from "../../../pkgs/config/AppConfigsEnvironment";

export type PasswordHashResult = {
  hash: string;
  salt: string;
  algorithm: "bcrypt";
};

@Injectable()
export class PasswordHasher {
  constructor(private readonly appConfigs: AppConfigsEnvironment) {}
  async hash(preHashedPassword: string): Promise<PasswordHashResult> {
    const salt = await bcrypt.genSalt(this.appConfigs.hashSaltLogRounds);
    const hash = await bcrypt.hash(preHashedPassword, salt);

    return {
      hash,
      salt,
      algorithm: "bcrypt",
    };
  }
  async comparePassword(
    preHashedPassword: string,
    hash: string,
  ): Promise<void> {
    const compareResult = await bcrypt.compare(preHashedPassword, hash);

    if (!compareResult) {
      throw new InvalidCredentialsError();
    }
  }
}
