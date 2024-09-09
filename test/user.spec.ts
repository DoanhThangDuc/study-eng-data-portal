import { setUpApp } from "./setUpApp";

beforeAll(async () => {
  await setUpApp();
}, 180000);

afterAll(async () => {});

import "../test/suites/User/UserRegisterTest";
