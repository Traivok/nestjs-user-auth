process.env.NODE_ENV = process.env.NODE_ENV ?? 'dev';

export type Config = { [key: string]: any };

export const baseConfig: Config = {
  DB_USER: process.env.USER,
  DB_SYNC: false,
}

export const devConfig: Config = {
  ...baseConfig,
  COOKIE_SECRET: 'fixme', // FIXME TODO
  DB_NAME: 'db_dev',
  DB_LOG: true,
}

export const testConfig: Config = {
  ...baseConfig,
  COOKIE_SECRET: 'secret',
  DB_NAME: 'db_test',
  DB_SYNC: true,
}

export const prodConfig: Config = {
  ...baseConfig,
  COOKIE_SECRET: 'fixme', // FIXME TODO
  DB_NAME: 'db_prod',
}

let config: Config;

switch (process.env.NODE_ENV) {
  case 'dev':
    config = devConfig;
    break;
  case 'prod':
    config = prodConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  default:
    throw new Error(`Unknown environment: ${ process.env.NODE_ENV }`);
}

export default () => config;
