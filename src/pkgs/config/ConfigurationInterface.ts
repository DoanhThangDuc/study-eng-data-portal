export interface ConfigurationInterface {
  port: number;
  hashSaltLogRounds: number;
  pg: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
