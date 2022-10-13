import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserInsertOutputDataModel } from './userInsertOutputData.model';
@ObjectType()
export class UserInsertOutputModel {
  @Field()
  message: string;
  @Field(type => UserInsertOutputDataModel)
  data: UserInsertOutputDataModel;
}
