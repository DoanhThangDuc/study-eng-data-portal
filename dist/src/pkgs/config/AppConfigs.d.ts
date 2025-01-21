export interface AppConfigs {
    setup: () => void;
    port: number;
    pgClient: string;
    pgDbName: string;
    maxPool: number;
    minPool: number;
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
export declare const appConfigs: AppConfigs;
