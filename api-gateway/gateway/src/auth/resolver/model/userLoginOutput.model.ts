import { Field, ObjectType } from '@nestjs/graphql';
import { UserLoginOutputDataModel } from './userLoginOutputData.model';

@ObjectType()
export class UserLoginOutputModel {
  @Field()
  message: string;
  @Field((type) => UserLoginOutputDataModel)
  data: UserLoginOutputDataModel;
}
