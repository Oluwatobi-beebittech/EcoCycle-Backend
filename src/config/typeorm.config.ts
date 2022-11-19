import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { RailwayConfig } from './railway.config';

const IS_PROD = JSON.parse(process.env.IS_PROD);
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = IS_PROD
  ? RailwayConfig
  : process.env;

export const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'ecocycle_migrations_table',
  migrationsRun: JSON.parse(process.env.DB_MIGRATIONS_RUN_ON_START) as boolean,
  logging: true,
};

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => typeOrmConfig,
};
