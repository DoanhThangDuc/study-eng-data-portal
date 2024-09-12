import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { GlobalException } from "../../../src/pkgs/exceptions/GlobalException";
import { HttpAdapterHost } from "@nestjs/core";
import * as supertest from "supertest";
import { UserModule } from "../../../src/domains/User/User.module";
import { ErrorFormatter } from "../../../src/pkgs/exceptions/ErrorFormatter";

let app: INestApplication;
export function getTestUserModule() {
  return {
    app,
    request: supertest(app.getHttpServer()),
  };
}
export async function setTestUserModule() {
  if (app) {
    return getTestUserModule();
  }

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [UserModule],
  }).compile();

  app = moduleFixture.createNestApplication({ rawBody: true });

  const httpAdapter = app.get(HttpAdapterHost);
  const errorFormatter = new ErrorFormatter();

  app.useGlobalFilters(new GlobalException(httpAdapter, errorFormatter));
  await app.init();

  return getTestUserModule();
}
