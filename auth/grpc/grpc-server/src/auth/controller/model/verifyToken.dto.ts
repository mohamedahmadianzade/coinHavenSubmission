import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenModel {
  @IsNotEmpty()
  @IsString()
  token: string;
}
