import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
})
export class AuthenticationGateway {
  private logger: Logger = new Logger('EventsGateway');

  afterInit() {
    this.logger.debug('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('auth')
  handleEvent(client: Socket, data: any): string {
    console.log('cliente:', client.id);
    console.log('data:', data);
    return data; // aquí, simplemente estamos devolviendo el mismo dato que recibimos
  }
}
