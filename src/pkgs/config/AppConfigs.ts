import { AppConfigsEnvironment } from "./AppConfigsEnvironment";

export interface AppConfigs {
  setup: () => void;
  port: number;
  pgDbName: string;
  pgHost: string;
  pgPort: number;
  pgUser: string;
  pgPass: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  hashSaltLogRounds: number;
}

export const appConfigs: AppConfigs = new AppConfigsEnvironment();
