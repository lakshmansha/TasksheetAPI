import { IsOptional, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  public clientId: string;

  @IsString()
  public fromDate: Date;

  @IsOptional()
  public toDate: Date;
}
