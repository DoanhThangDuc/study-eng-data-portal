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
  let keysely: KyselyReaderService<DB>;
  const seeUserEmail: string[] = [];

  beforeEach(async () => {
    const appContext = getTestUserModule();
    ({ request, keysely } = appContext);
  });

  afterEach(async () => {
    await deleteUserByEmail(keysely, seeUserEmail);
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

  it.only("should thow error when user email address is not found", async () => {
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
    console.log("response", response.body);

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.CONFLICT,
      body: {
        debugMessage: "This email address is already being used",
        options: {},
        status: "ERROR",
        type: "EmailExists",
      },
    });
  });

  it("should sign up user successfully", async () => {
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

    // act - create a new user with existing email
    const response = await request
      .post("/v1/auth/signin")
      .send(userCreatePayload)
      .expect(HttpStatus.CREATED);

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: HttpStatus.CREATED,
      body: {
        userResponse: {
          administrator: false,
          emailAddressVerified: false,
          enabled: true,
          id: expect.any(String),
        },
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    });
  });
});
