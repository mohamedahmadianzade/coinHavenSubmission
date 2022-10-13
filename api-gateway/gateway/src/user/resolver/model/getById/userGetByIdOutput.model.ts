import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserGetByIdOutputDataModel } from './userGetByIdOutputData.model';
@ObjectType()
export class UserGetByIdOutputModel {
  @Field()
  message: string;
  @Field(() => UserGetByIdOutputDataModel)
  data: any;
}
