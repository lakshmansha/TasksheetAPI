import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;
}

export class AuthUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
