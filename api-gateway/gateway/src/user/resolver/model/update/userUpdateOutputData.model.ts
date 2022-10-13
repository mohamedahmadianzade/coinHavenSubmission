import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserUpdateOutputDataModel {
  @Field()
  userId: string;
}
