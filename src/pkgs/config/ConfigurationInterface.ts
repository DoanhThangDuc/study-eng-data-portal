export interface ConfigurationInterface {
  port: number;
  hashSaltLogRounds: number;
  jwtSecret: string;
  expiresIn: string;
  pg: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
