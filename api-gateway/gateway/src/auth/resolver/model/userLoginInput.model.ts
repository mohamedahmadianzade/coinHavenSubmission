import {  Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserLoginInputModel {
  @Field()
  @IsNotEmpty()
  username: string;
  @Field()
  @IsNotEmpty()
  password: string;
}
