import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInPayloadDto } from "../dtos/UserSignInPayloadDto";
import { JwtService } from "@nestjs/jwt";
import { DB } from "../../../db/types";
import { KyselyReaderService } from "../../../infrastructure/KyselyReaderService.provider";

const users = [
  {
    id: 1,
    emailAddress: "duc.doanh@urbn8.com",
    emailAddressVerified: true,
    administrator: true,
    enabled: true,
    preHashedPassword:
      "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090",
  },
  {
    id: 2,
    emailAddress: "duc.doanh+2@urbn8.com",
    emailAddressVerified: true,
    administrator: true,
    enabled: true,
    preHashedPassword:
      "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
  },
];
@Injectable()
export class UserSignInAction {
  constructor(private readonly jwtService: JwtService) {}

  async mockValidateUser(payload: UserSignInPayloadDto) {
    console.log("userFound", payload);

    const userFound = users.find(
      (user) => user.emailAddress === payload.emailAddress,
    );

    if (!userFound) {
      return null;
    }

    if (userFound.preHashedPassword === payload.password) {
      const { preHashedPassword, ...user } = userFound;
      return this.jwtService.sign(user);
    }

    throw new UnauthorizedException("Invalid password");
  }

  async validateUser(
    client: KyselyReaderService<DB>,
    payload: UserSignInPayloadDto,
  ) {
    const [user] = await client
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

    // return jwtService.sign(user);
  }
}
