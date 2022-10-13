import { IsNotEmpty } from 'class-validator';

export class LoginModel {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
  