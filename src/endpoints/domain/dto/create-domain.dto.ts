import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateDomainDto {
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio.' })
  @Matches(/^[a-zA-Z0-9\+]{12}$/, {
    message: 'El ID del cliente no tiene un formato válido.',
  })
  clientId: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;

  @IsString({ message: 'La URL debe ser una cadena de texto.' })
  @IsUrl(
    {
      protocols: ['http', 'https', 'ftp'],
      require_tld: false, // Para permitir URLs sin TLD, como 127.0.0.1
      require_protocol: true,
      // host_whitelist: ['127.0.0.1', 'localhost'],
      host_blacklist: [],
    },
    { message: 'La URL no tiene un formato válido.' },
  )
  url: string;
}
