import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  public clientCode: string;

  @IsString()
  public clientName: string;
}
