import config         from './config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: config.DB_NAME,
  username: config.DB_USER,
  synchronize: config.DB_SYNC ?? false,
  entities: [ './src/**/*.entity.{js,ts}'],
});
