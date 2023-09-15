import { Injectable } from '@nestjs/common';
import { toDataURL, QRCodeToDataURLOptions } from 'qrcode';
import { JwtService } from 'src/services/jwt.service';

@Injectable()
export class QrService {
  constructor(private readonly _jwt: JwtService) {}

  async generate(data: { socketClient: string; domainId: string }) {
    try {
      const options: QRCodeToDataURLOptions = {
        scale: 10,
        margin: 0.2,
        color: {
          dark: '#030E1A',
          light: '#FFF',
        },
        rendererOpts: { quality: 1 },
        errorCorrectionLevel: 'H',
      };

      const content = this._jwt.generateToken({
        id: data.domainId,
        client: data.socketClient,
      });
      return await toDataURL(content, options);
    } catch (err) {
      throw new Error('Failed to generate QR Code');
    }
  }
}
