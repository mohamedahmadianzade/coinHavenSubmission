import {  IsNotEmpty, IsString} from 'class-validator';

export class UsernameModel {
  @IsString()
  @IsNotEmpty()
  username: string;
}
