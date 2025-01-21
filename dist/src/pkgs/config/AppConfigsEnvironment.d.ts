import { AppConfigs } from "./AppConfigs";
export declare class AppConfigsEnvironment implements AppConfigs {
    setup(): void;
    get port(): number;
    get pgHost(): string;
    get maxPool(): number;
    get minPool(): number;
    get pgPort(): number;
    get pgClient(): string;
    get pgDbName(): string;
    get pgUser(): string;
    get pgPass(): string;
    get hashSaltLogRounds(): number;
    get jwtAccessSecret(): string;
    get jwtRefreshSecret(): string;
    get accessTokenExpiresIn(): string;
    get refreshTokenExpiresIn(): string;
}
