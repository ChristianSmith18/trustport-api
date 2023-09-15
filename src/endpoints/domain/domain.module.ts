import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { ClientModule } from '@endpoints/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Domain]), ClientModule],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
