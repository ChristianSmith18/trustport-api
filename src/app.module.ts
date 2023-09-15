import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints/endpoints.module';
import { ormConfig } from '@config/orm.config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), EndpointsModule, ServicesModule],
})
export class AppModule {}
