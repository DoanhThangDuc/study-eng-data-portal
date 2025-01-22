import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { GlobalException } from "../../../src/pkgs/exceptions/GlobalException";
import { UserModule } from "../../../src/domains/User/User.module";
import { ErrorFormatter } from "../../../src/pkgs/exceptions/ErrorFormatter";
import { KyselyReaderService } from "../../../src/infrastructure/KyselyReaderService.provider";
import { DB } from "../../../src/db/types";
import * as supertest from "supertest";
import { AppModule } from "../../../src/app.module";

let app: INestApplication;
export function getTestUserModule() {
  return {
    app,
    request: supertest(app.getHttpServer()),
    kysely: app.get<KyselyReaderService<DB>>(KyselyReaderService),
  };
}
export async function setTestUserModule() {
  if (app) {
    return getTestUserModule();
  }

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, UserModule],
  }).compile();

  app = moduleFixture.createNestApplication({ rawBody: true });
  const errorFormatter = new ErrorFormatter();

  app.useGlobalFilters(new GlobalException(errorFormatter));

  await app.init();

  return getTestUserModule();
}
