import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString , IsEmail,IsOptional } from 'class-validator';
@ArgsType()
export class UserUpdateInputModel {
  @Field({nullable:true})
  fullName?: string;
  @Field({nullable:true})
  @IsEmail()
  email?: string;
  @Field()
  userId:string;
}
