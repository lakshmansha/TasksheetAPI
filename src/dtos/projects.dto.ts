import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  public clientId: string;

  @IsString()
  public projectCode: string;

  @IsString()
  public projectName: string;

  @IsString()
  public description: string;

  @IsOptional()
  public ownedBy?: string;
}
