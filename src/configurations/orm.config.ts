import { Client } from '@endpoints/client/entities/client.entity';
import { Domain } from '@endpoints/domain/entities/domain.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Client, Domain],
  synchronize: true,
};
