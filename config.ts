import { ConfigService } from '@nestjs/config';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'dev';

export type Config = { [key: string]: any };

export const baseConfig: Config = {
  COOKIE_SECRET: 'fixme',
  DB_SYNC: false,
  DB_USER: process.env.USER,
}

export const devConfig: Config = {
  ...baseConfig,
  DB_NAME: 'mode_dev',
}

export const testConfig: Config = {
  ...baseConfig,
  DB_NAME: 'mode_test',
  DB_SYNC: true,
}

export const prodConfig: Config = {
  ...baseConfig,
  DB_NAME: 'fixme',
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

export default config;
