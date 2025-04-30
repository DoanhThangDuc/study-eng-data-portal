import { startApp } from "./startApp";
import { setTestUserModule } from "./suites/User/getTestUserModule";

beforeAll(async () => {
  await startApp();
  await setTestUserModule();
}, 180000);

afterAll(async () => {});

import "./suites/User/UserSignUpTest";
import "./suites/User/UserSignInTest";
import "./suites/User/UserGetMeTest";
