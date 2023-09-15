import { Module } from '@nestjs/common';
import { ValidationModule } from './validation/validation.module';
import { ClientModule } from './client/client.module';
import { DomainModule } from './domain/domain.module';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [ValidationModule, ClientModule, DomainModule, QrModule],
})
export class EndpointsModule {}
