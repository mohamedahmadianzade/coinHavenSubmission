import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString , IsEmail,IsOptional } from 'class-validator';
@ArgsType()
export class UserInsertInputModel {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @Field()
  @IsOptional()
  @IsEmail()
  email: string;
}
