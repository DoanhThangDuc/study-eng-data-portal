import { Injectable } from "@nestjs/common";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { JwtService } from "@nestjs/jwt";
import { DB } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";

@Injectable()
export class UserSignInAction {
  constructor(
    private readonly jwtService: JwtService,
    private readonly kyselyReaderService: KyselyReaderService<DB>,
  ) {}

  async validateUser(payload: UserSignInPayloadDto) {
    const [user] = await this.kyselyReaderService
      .selectFrom("User")
      .select("User.id")
      .select("User.emailAddress")
      .select("User.emailAddressVerified")
      .select("User.administrator")
      .select("User.enabled")
      .where("User.emailAddress", "=", payload.emailAddress.toLowerCase())
      .execute();

    // Compare 2 passwords in here

    if (!user) return null;

    // return this.jwtService.sign(user);
  }
}
