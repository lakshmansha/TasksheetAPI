import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public projectId: string;

  @IsString()
  public trackingCode: string;

  @IsString()
  public taskType: string;

  @IsString()
  public taskName: string;

  @IsNotEmpty()
  public reportedAt: Date;

  @IsString()
  public resource: string;

  @IsNumber()
  public estimatedHrs: number;

  @IsString()
  public status: string;
}
