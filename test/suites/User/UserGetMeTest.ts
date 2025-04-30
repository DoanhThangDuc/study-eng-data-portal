import { Test } from "supertest";
import TestAgent from "supertest/lib/agent";
import { deleteUserByEmail } from "../../commonTests";
import { getTestUserModule } from "./getTestUserModule";
import { DB } from "../../../src/db/types";
import { KyselyReaderService } from "../../../src/infrastructure/KyselyReaderService.provider";
import { createUserByToken } from "../../createUserByToken";
import generatePreHashedPassword from "../../generatePreHashedPassword";
import { pick } from "lodash";
import { HttpStatus } from "@nestjs/common";

describe("GET /v1/users/me", () => {
  let request: TestAgent<Test>;
  let kysely: KyselyReaderService<DB>;
  const seedUserEmail: string[] = [];

  beforeEach(async () => {
    const appContext = getTestUserModule();
    ({ request, kysely } = appContext);
  });

  afterEach(async () => {
    await deleteUserByEmail(kysely, seedUserEmail);
  });

  it("should throw error when user is anonymous user", async () => {
    // arrange user
    await createUserByToken(request, {
      emailAddress: "test@example.com",
      firstName: "john",
      lastName: "doe",
      preHashedPassword: generatePreHashedPassword("test@example.com"),
    });
    seedUserEmail.push("test@example.com");

    // act - calling endpoint get me to get user data without user token
    const response = await request
      .get("/v1/users/me")
      .set("Accept", "application/json");

    // assert - should throw UnauthorizedError
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: 401,
      body: {
        debugMessage: "Token user is required!",
        type: "UnauthorizedError",
        options: {},
        status: "ERROR",
      },
    });
  });

  it("should response user correctly when getting user with valid token", async () => {
    // arrange user
    const { token } = await createUserByToken(request, {
      emailAddress: "test@example.com",
      firstName: "john",
      lastName: "doe",
      preHashedPassword: generatePreHashedPassword("test@example.com"),
    });
    seedUserEmail.push("test@example.com");

    // act - calling endpoint get me to get user data without user token
    const response = await request
      .get("/v1/users/me")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    // assert - should throw UnauthorizedError
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.OK,
      body: {
        administrator: false,
        emailAddress: "test@example.com",
        emailAddressVerified: false,
        enabled: true,
        exp: expect.any(Number),
        firstName: "john",
        iat: expect.any(Number),
        id: expect.any(String),
        lastName: "doe",
      },
    });
  });
});
