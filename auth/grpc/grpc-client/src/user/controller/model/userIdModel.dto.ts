import {  IsNotEmpty, IsString} from 'class-validator';

export class UserIdModel {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
