import { Domain } from '@endpoints/domain/entities/domain.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ unique: true })
  organization: string;

  @Column({ type: 'text' })
  logo: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ unique: true })
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Domain, (domain) => domain.client)
  domains: Domain[];
}
