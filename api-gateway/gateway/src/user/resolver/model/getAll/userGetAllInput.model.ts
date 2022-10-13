import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
@ArgsType()
export class UserGetAllInputModel {
  @Field(type=> Int, { defaultValue: 1, nullable: true })
  pageNumber?: number
  @Field(type=> Int,{ defaultValue: 10, nullable: true })
  pageSize?: number;
}
