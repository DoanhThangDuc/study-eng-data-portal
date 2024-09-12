import { AppConfigsEnvironment } from "./AppConfigsEnvironment";

export interface AppConfigs {
  setup: () => void;
  port: number;
  pgDbName: string;
  pgHost: string;
  pgPort: number;
  pgUser: string;
  pgPass: string;
  jwtSecret: string;
  expiresIn: string;
  hashSaltLogRounds: number;
}

export const appConfigs: AppConfigs = new AppConfigsEnvironment();
