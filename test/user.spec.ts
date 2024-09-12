import { startApp } from "./startApp";
import "../test/suites/User/UserRegisterTest";
import { setTestUserModule } from "./suites/User/getTestUserModule";

beforeAll(async () => {
  await startApp();
  await setTestUserModule();
}, 180000);

afterAll(async () => {});
