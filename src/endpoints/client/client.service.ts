import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { FirebaseService } from 'src/services/firebase.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly _firebase: FirebaseService,
  ) {}

  async create(createClientDto: CreateClientDto, logoBuffer: Buffer) {
    const { organization, url, description } = createClientDto;
    const CLIENT_ID = this.generateClientID(url, organization);

    const exists = await this.findOne(CLIENT_ID);
    if (exists) throw new BadRequestException('Client exists');

    const filename = `${organization.split(' ').join('_')}-${Date.now()}.png`;
    const imageUrl = await this._firebase.uploadImage(filename, logoBuffer);

    const client = this.clientRepository.create({
      id: CLIENT_ID,
      url,
      description,
      organization,
      logo: imageUrl,
    });

    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: string) {
    return this.clientRepository.findOne({
      where: { id },
      relations: ['domains'],
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const existingClient = await this.clientRepository.findOne({
      where: { id },
    });
    if (!existingClient) {
      throw new NotFoundException(`Client not found`);
    }

    const updatedClient = Object.assign(existingClient, updateClientDto);

    return this.clientRepository.save(updatedClient);
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this._firebase.deleteImageFromPublicUrl(client.logo);

    return await this.clientRepository.remove(client);
  }

  private generateClientID(url: string, orgName: string): string {
    const data = url + orgName;
    const hashBuffer = createHash('sha256').update(data).digest();
    const base64Hash = hashBuffer.toString('base64');

    return base64Hash.slice(0, 12);
  }
}
