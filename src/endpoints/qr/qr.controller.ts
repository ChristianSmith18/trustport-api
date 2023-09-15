import { Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { QrService } from './qr.service';
import { Response } from 'express';

@Controller('qr')
export class QrController {
  constructor(private readonly _qr: QrService) {}

  @Post('create')
  async generate(
    @Query() data: { socketClient: string; domainId: string },
    @Res() response: Response,
  ) {
    try {
      const qrDataURL = await this._qr.generate(data);
      const base64Data = qrDataURL.split(',')[1];
      const buf = Buffer.from(base64Data, 'base64');

      response.setHeader('Content-Type', 'image/png');
      return response.status(HttpStatus.OK).send(buf);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }
}
