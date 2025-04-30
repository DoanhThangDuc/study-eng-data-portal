import { HttpStatus } from "@nestjs/common";
import { UserSignUpPayloadDto } from "../src/domains/Auth/UserSignUp/UserSignUpPayloadDto";
import { Test } from "supertest";
import TestAgent from "supertest/lib/agent";

export async function createUserByToken(
  request: TestAgent<Test>,
  payload: UserSignUpPayloadDto,
): Promise<{
  token: string;
}> {
  const response = await request
    .post("/v1/auth/signup")
    .send(payload)
    .expect(HttpStatus.CREATED);

  const { accessToken } = response.body;

  return { token: accessToken };
}
