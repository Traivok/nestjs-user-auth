import getConfig      from './config';
import { DataSource } from 'typeorm';
import { Logger }     from '@nestjs/common';

const config = getConfig();

const logger = new Logger('TypeormConfig');
logger.log(`Connecting to database ${ config.DB_NAME } as ${ config.DB_USER }`);

export default new DataSource({
  type:        'postgres',
  host:        'localhost',
  database:    config.DB_NAME,
  username:    config.DB_USER,
  synchronize: config.DB_SYNC ?? false,
  logging:     config.DB_LOG ?? false,
  entities:    [ __dirname + '/src/**/*.entity.{js,ts}' ],
  migrations:  [ __dirname + '/migrations/**/*{.ts,.js}' ],
});
