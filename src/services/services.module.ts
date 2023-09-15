import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { JwtService } from './jwt.service';
import { AuthenticationGateway } from './authentication.gateway';

@Module({
  providers: [FirebaseService, JwtService, AuthenticationGateway],
  exports: [FirebaseService, JwtService],
})
export class ServicesModule {}
