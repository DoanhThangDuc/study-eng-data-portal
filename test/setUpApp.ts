import { startApp } from "./startApp";

export async function setUpApp() {
  // use for initializing global

  await startApp();
  global.any = {};
}
