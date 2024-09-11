import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { UserModule } from "../../../src/domains/User/User.module";
import { pick } from "lodash";

describe("POST /v1/users", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should validate user payload correctly", async () => {
    // act - calling endpoint user sign up
    const response = await request(app.getHttpServer()).post("/v1/users");

    // assert - should validate user payload
    expect(pick(response, ["status", "body"])).toMatchObject({
      status: 400,
      body: {
        message: [
          "emailAddress must be an email",
          "emailAddress should not be empty",
          "firstName should not be empty",
          "firstName must be a string",
          "lastName should not be empty",
          "lastName must be a string",
          "preHashedPassword must be a hash of type sha256",
          "preHashedPassword should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    });
  });

  it("should thow error when user email address is already in use", async () => {
    // arrange - calling endpoint user sign up
    await request(app.getHttpServer())
      .post("/v1/users")
      .send({
        emailAddress: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        preHashedPassword:
          "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
      })
      .expect(201);

    // act - create a new user with existing email
    const responseExistingEmail = await request(app.getHttpServer())
      .post("/v1/users")
      .send({
        emailAddress: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        preHashedPassword:
          "3d8f6d40c2f0d5bc973c1a1fe53b178d90807e42c01b9d151ce2f561ab55200b",
      });

    // assert - should validate user payload
    console.log("responseExistingEmail", responseExistingEmail.body);

    expect(pick(responseExistingEmail, ["status", "body"])).toMatchObject({
      status: 409,
      body: { statusCode: 409, message: "CONFLICT" },
    });
  });
});
