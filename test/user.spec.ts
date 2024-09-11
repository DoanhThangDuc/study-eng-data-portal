import { startApp } from "./startApp";

beforeAll(async () => {
  await startApp();
}, 180000);

afterAll(async () => {});

import "../test/suites/User/UserRegisterTest";
