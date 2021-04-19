import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackerDto {
  @IsString()
  public taskId: string;

  @IsOptional()
  public workNotes: string;

  @IsOptional()
  public actualHrs: number;

  @IsOptional()
  public billableHrs: number;

  @IsEmpty()
  public checkIn: Date;

  @IsEmpty()
  public checkOut: Date;

  @IsString()
  public createBy: string;
}
