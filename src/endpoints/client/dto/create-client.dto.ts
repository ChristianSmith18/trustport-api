import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString({
    message: 'El nombre de la organización debe ser una cadena de texto.',
  })
  @MaxLength(255, {
    message: 'El nombre de la organización no debe superar los 255 caracteres.',
  })
  organization: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description?: string;

  @IsUrl(
    {
      protocols: ['http', 'https', 'ftp'],
      require_tld: false, // Para permitir URLs sin TLD, como 127.0.0.1
      require_protocol: true,
      host_blacklist: [],
      // host_whitelist: ['127.0.0.1', 'localhost'],
    },
    { message: 'La URL proporcionada no es válida.' },
  )
  @MaxLength(255, { message: 'La URL no debe superar los 255 caracteres.' })
  url: string;
}
