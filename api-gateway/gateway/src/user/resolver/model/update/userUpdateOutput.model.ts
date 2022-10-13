import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserUpdateOutputDataModel } from './userUpdateOutputData.model';
@ObjectType()
export class UserUpdateOutputModel {
  @Field()
  message: string;
  @Field(type => UserUpdateOutputDataModel)
  data: UserUpdateOutputDataModel;
}
