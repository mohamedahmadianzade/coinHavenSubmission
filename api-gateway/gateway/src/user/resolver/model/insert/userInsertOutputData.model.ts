import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInsertOutputDataModel {
  @Field()
  userId: string;
  @Field()
  username: string;
}
