import { IsNotEmpty } from 'class-validator';

export class VerifyTokenModel {
  @IsNotEmpty()
  access_token: string;
}
