import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Res,
  HttpStatus,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('client')
export class ClientController {
  constructor(private readonly _client: ClientService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createClientDto: CreateClientDto,
    @Res() response: Response,
  ) {
    try {
      const client = await this._client.create(createClientDto, logo.buffer);
      if (client)
        return response.status(HttpStatus.CREATED).json({ ok: true, client });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      console.log('Error:', error);
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Get('all')
  async findAll(@Res() response: Response) {
    try {
      const clients = await this._client.findAll();
      if (clients)
        return response.status(HttpStatus.OK).json({ ok: true, clients });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Get('one')
  async findOne(@Query('id') id: string, @Res() response: Response) {
    try {
      const client = await this._client.findOne(id);
      if (client)
        return response.status(HttpStatus.OK).json({ ok: true, client });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Put()
  async update(
    @Query('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Res() response: Response,
  ) {
    try {
      const client = await this._client.update(id, updateClientDto);
      if (client)
        return response.status(HttpStatus.ACCEPTED).json({ ok: true, client });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Delete()
  async remove(@Query('id') id: string, @Res() response: Response) {
    try {
      const client = await this._client.remove(id);
      if (client)
        return response.status(HttpStatus.ACCEPTED).json({ ok: true });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }
}
