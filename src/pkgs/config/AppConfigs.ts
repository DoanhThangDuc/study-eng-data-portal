import { AppConfigsEnvironment } from "./AppConfigsEnvironment";

export interface AppConfigs {
  setup: () => void;
  port: number;
  pgDbName: string;
  pgHost: string;
  pgPort: number;
  pgUser: string;
  pgPass: string;
}

export const appConfigs: AppConfigs = new AppConfigsEnvironment();
