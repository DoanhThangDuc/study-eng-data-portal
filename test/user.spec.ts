import { startApp } from "./startApp";
import { setTestUserModule } from "./suites/User/getTestUserModule";

beforeAll(async () => {
  await startApp();
  await setTestUserModule();
}, 180000);

afterAll(async () => {});

import "../test/suites/User/UserRegisterTest";
