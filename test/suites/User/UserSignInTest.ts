import { pick } from "lodash";
import { getTestUserModule } from "./getTestUserModule";
import TestAgent from "supertest/lib/agent";
import { HttpStatus } from "@nestjs/common";
import { Test } from "supertest";
import { DB } from "../../../src/db/types";
import { KyselyReaderService } from "../../../src/infrastructure/KyselyReaderService.provider";
import { deleteUserByEmail } from "../../commonTests";
import { UserSignInPayloadDto } from "../../../src/domains/Auth/dtos/UserSignInPayloadDto";

describe("POST /v1/auth/signin", () => {
  let request: TestAgent<Test>;
  let kysely: KyselyReaderService<DB>;
  const seeUserEmail: string[] = [];

  beforeEach(async () => {
    const appContext = getTestUserModule();
    ({ request, kysely } = appContext);
  });

  afterEach(async () => {
    await deleteUserByEmail(kysely, seeUserEmail);
  });

  it("should validate user payload correctly", async () => {
    // act - calling endpoint user sign in
    const response = await request.post("/v1/auth/signin");

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.BAD_REQUEST,
      body: {
        status: "ERROR",
        type: "Bad Request Exception",
        debugMessage:
          "You have an error in your request's body. Check 'fieldErrors' field for more details!",
        fieldErrors: [
          "emailAddress must be an email",
          "emailAddress should not be empty",
          "password must be a hash of type sha256",
          "password should not be empty",
        ],
      },
    });
  });

  it("should thow error when user email address is not found", async () => {
    // arrange - user payload
    const userEmail = "user@example.com";

    const payload: UserSignInPayloadDto = {
      emailAddress: userEmail,
      password:
        "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
    };
    seeUserEmail.push(userEmail);

    // act - calling sign in endpoint
    const response = await request.post("/v1/auth/signin").send(payload);

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.NOT_FOUND,
      body: {
        debugMessage: "User not found",
        options: {},
        status: "ERROR",
        type: "UserNotFoundError",
      },
    });
  });

  it("should thow error when user password is incorrect", async () => {
    // arrange user payload
    const userEmail = "user@example.com";

    const userCreatePayload = {
      emailAddress: userEmail,
      firstName: "John",
      lastName: "Doe",
      preHashedPassword:
        "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
    };
    seeUserEmail.push(userEmail);

    // arrange - create a new user with existing email
    await request
      .post("/v1/auth/signup")
      .send(userCreatePayload)
      .expect(HttpStatus.CREATED);

    // confirm - register user successfully in DB
    const [userDto] = await kysely
      .selectFrom("User")
      .select("User.emailAddress")
      .select("User.firstName")
      .select("User.lastName")
      .select("User.emailAddressVerified")
      .select("User.administrator")
      .select("User.enabled")
      .where("User.emailAddress", "=", userEmail.toLowerCase())
      .execute();

    expect(userDto).toMatchObject({
      emailAddress: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      emailAddressVerified: false,
      administrator: false,
      enabled: true,
    });

    // arrange - user payload with wrong password
    const payload: UserSignInPayloadDto = {
      emailAddress: userEmail,
      password:
        "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55111b", // wrong password
    };

    // act - calling sign in endpoint
    const response = await request.post("/v1/auth/signin").send(payload);

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.UNAUTHORIZED,
      body: {
        debugMessage: "Passwords do not match",
        options: {},
        status: "ERROR",
        type: "InvalidCredentials",
      },
    });
  });

  it("should sign up user successfully", async () => {
    // arrange user payload
    const userEmail = "user@example.com";
    const password =
      "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b";

    const userCreatePayload = {
      emailAddress: userEmail,
      firstName: "John",
      lastName: "Doe",
      preHashedPassword: password,
    };
    seeUserEmail.push(userEmail);

    // arrange - create a new user with existing email
    await request
      .post("/v1/auth/signup")
      .send(userCreatePayload)
      .expect(HttpStatus.CREATED);

    // confirm - register user successfully in DB
    const [userDto] = await kysely
      .selectFrom("User")
      .select("User.emailAddress")
      .select("User.firstName")
      .select("User.lastName")
      .select("User.emailAddressVerified")
      .select("User.administrator")
      .select("User.enabled")
      .where("User.emailAddress", "=", userEmail.toLowerCase())
      .execute();

    expect(userDto).toMatchObject({
      emailAddress: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      emailAddressVerified: false,
      administrator: false,
      enabled: true,
    });

    // arrange - user payload with correct password
    const payload: UserSignInPayloadDto = {
      emailAddress: userEmail,
      password,
    };

    // act - calling sign in endpoint
    const response = await request.post("/v1/auth/signin").send(payload);

    // assert - should sign in user correctly
    expect(pick(response, ["status", "header", "body"])).toMatchObject({
      status: HttpStatus.OK,
      header: {
        authorization: expect.any(String),
        refreshtoken: expect.any(String),
      },
      body: {
        administrator: false,
        emailAddress: "user@example.com",
        emailAddressVerified: false,
        enabled: true,
        firstName: "John",
        id: expect.any(String),
        lastName: "Doe",
      },
    });
  });
});
