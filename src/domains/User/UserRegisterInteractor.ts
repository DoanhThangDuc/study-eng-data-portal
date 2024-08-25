import { Injectable } from "@nestjs/common";
import { UserCreatePayloadDto } from "./UserCreatePayloadDto";
import { KyselyReaderService } from "../../infrastructure/KyselyReaderService.provider";
import { DB } from "../../db/types";

@Injectable()
export class UserRegisterInteractor {
  constructor(private kyselyReaderService: KyselyReaderService<DB>) {}
  async execute(payload: UserCreatePayloadDto) {
    const user = await this.kyselyReaderService
      .insertInto("user")
      .values({
        email: "Jennifer",
        firstName: "Aniston",
        lastName: "Doanh",
      })
      .executeTakeFirst();

    return user;
  }
}
