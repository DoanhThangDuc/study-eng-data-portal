export interface ConfigurationInterface {
    appPort: number;
    jwt: {
        hashSaltLogRounds: number;
        jwtAccessTokenSecret: string;
        jwtRefreshTokenSecret: string;
        accessTokenExpiration: string;
        refreshTokenExpiration: string;
    };
    pg: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
}
