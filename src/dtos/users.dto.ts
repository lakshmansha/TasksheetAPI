import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;
}

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  @IsOptional()
  @IsString()
  public designation: string;

  @IsOptional()
  @IsString()
  public aboutMe: string;
}

export class AuthUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
