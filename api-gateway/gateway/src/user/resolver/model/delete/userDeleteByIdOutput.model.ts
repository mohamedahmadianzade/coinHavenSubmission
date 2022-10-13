import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDeleteOutputDataModel } from './userDeleteOutputData.model';
@ObjectType()
export class UserDeleteOutputModel {
  @Field()
  message: string;
  @Field(() => UserDeleteOutputDataModel)
  data: any;
}
