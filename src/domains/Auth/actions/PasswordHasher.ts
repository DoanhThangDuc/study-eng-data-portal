import * as bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../../../pkgs/errors/InvalidCredentialsError";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type PasswordHashResult = {
  hash: string;
  salt: string;
  algorithm: "bcrypt";
};

@Injectable()
export class PasswordHasher {
  constructor(private readonly congfigService: ConfigService) {}
  async hash(preHashedPassword: string): Promise<PasswordHashResult> {
    const salt = await bcrypt.genSalt(
      this.congfigService.get("jwt.hashSaltLogRounds"),
    );
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
      throw new InvalidCredentialsError("Passwords do not match");
    }
  }
}
