import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpStatus,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Response } from 'express';

@Controller('domain')
export class DomainController {
  constructor(private readonly _domain: DomainService) {}

  @Post()
  async create(
    @Body() createClientDto: CreateDomainDto,
    @Res() response: Response,
  ) {
    try {
      const client = await this._domain.create(createClientDto);
      if (client)
        return response.status(HttpStatus.CREATED).json({ ok: true, client });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Get('all')
  async findAll(
    @Query('organization') organization: string,
    @Res() response: Response,
  ) {
    try {
      const domains = await this._domain.findAll(organization);
      if (domains)
        return response.status(HttpStatus.OK).json({ ok: true, domains });

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
      const domain = await this._domain.findOne(id);
      if (domain)
        return response.status(HttpStatus.OK).json({ ok: true, domain });

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
    @Body() updateDomainDto: UpdateDomainDto,
    @Res() response: Response,
  ) {
    try {
      const domain = await this._domain.update(id, updateDomainDto);
      if (domain)
        return response.status(HttpStatus.ACCEPTED).json({ ok: true, domain });

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
      const domain = await this._domain.remove(id);
      if (domain)
        return response.status(HttpStatus.ACCEPTED).json({ ok: true });

      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, error: 'Ocurrió un error inesperado.' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }
}
