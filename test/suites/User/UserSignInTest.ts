import { pick } from "lodash";
import { getTestUserModule } from "./getTestUserModule";
import TestAgent from "supertest/lib/agent";
import { HttpStatus } from "@nestjs/common";
import { Test } from "supertest";
import { DB } from "../../../src/db/types";
import { KyselyReaderService } from "../../../src/infrastructure/KyselyReaderService.provider";
import { deleteUserByEmail } from "../../commonTests";

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
    // act - calling endpoint user sign up
    const response = await request.post("/v1/auth/signup");

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
          "firstName should not be empty",
          "firstName must be a string",
          "lastName should not be empty",
          "lastName must be a string",
          "preHashedPassword must be a hash of type sha256",
          "preHashedPassword should not be empty",
        ],
      },
    });
  });

  it("should thow error when user email address is already in use", async () => {
    // arrange - calling endpoint user sign up
    const userEmail = "user@example.com";
    await request
      .post("/v1/auth/signup")
      .send({
        emailAddress: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        preHashedPassword:
          "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
      })
      .expect(HttpStatus.CREATED);

    seeUserEmail.push(userEmail);

    // act - create a new user with existing email
    const responseExistingEmail = await request.post("/v1/auth/signup").send({
      emailAddress: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      preHashedPassword:
        "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
    });

    // assert - should validate user payload
    expect(pick(responseExistingEmail, ["status", "body"])).toMatchObject({
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
      .post("/v1/auth/signup")
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
