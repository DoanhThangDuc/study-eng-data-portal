export interface ConfigurationInterface {
  pg: {
    host: string;
    port: number;
    db: string;
    user: string;
    pass: string;
    max: number;
  };
}
