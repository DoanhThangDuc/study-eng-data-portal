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
});
