import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { Repository } from 'typeorm';
import { ClientService } from '@endpoints/client/client.service';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    private readonly _client: ClientService,
  ) {}

  async create(createDomainDto: CreateDomainDto) {
    const { clientId, ...rest } = createDomainDto;
    const clientEntity = await this._client.findOne(createDomainDto.clientId);
    if (!clientEntity) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const existingDomainsCount = await this.domainRepository.count({
      where: { client: clientEntity },
    });

    const newDomainId = `${createDomainDto.clientId}-${(
      existingDomainsCount + 1
    )
      .toString()
      .padStart(3, '0')}`;

    const domain = this.domainRepository.create({
      ...rest,
      client: { id: clientId },
      id: newDomainId,
    });

    return this.domainRepository.save(domain);
  }

  findAll(clientID: string) {
    return this.domainRepository.find({ where: { client: { id: clientID } } });
  }

  findOne(id: string) {
    return this.domainRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateDomainDto: UpdateDomainDto) {
    const existingDomain = await this.domainRepository.findOne({
      where: { id },
    });
    if (!existingDomain) {
      throw new NotFoundException(`Domain not found`);
    }

    const updatedClient = Object.assign(existingDomain, updateDomainDto);

    return this.domainRepository.save(updatedClient);
  }

  async remove(id: string) {
    const domain = await this.domainRepository.findOne({ where: { id } });

    if (!domain) {
      throw new NotFoundException('Domain not found');
    }

    return await this.domainRepository.remove(domain);
  }
}
