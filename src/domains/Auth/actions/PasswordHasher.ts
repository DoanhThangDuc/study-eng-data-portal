import * as bcrypt from "bcrypt";

export type PasswordHashResult = {
  hash: string;
  salt: string;
  algorithm: "bcrypt";
};

export class PasswordHasher {
  constructor(private hashSaltLogRounds: number) {}

  async hash(preHashedPassword: string): Promise<PasswordHashResult> {
    const salt = await bcrypt.genSalt(this.hashSaltLogRounds);
    const hash = await bcrypt.hash(preHashedPassword, salt);

    return {
      hash,
      salt,
      algorithm: "bcrypt",
    };
  }
}
