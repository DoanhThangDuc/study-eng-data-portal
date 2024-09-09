export interface ConfigurationInterface {
  port: number;
  pg: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
