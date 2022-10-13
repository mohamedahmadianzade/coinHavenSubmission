import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserGetAllOutputDataModel } from './userGetAllOutputData.model';
@ObjectType()
export class UserGetAllOutputModel {
  @Field()
  message: string;
  @Field(() => [UserGetAllOutputDataModel])
  data: UserGetAllOutputDataModel[];
}
