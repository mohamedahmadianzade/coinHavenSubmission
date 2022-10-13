import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDeleteOutputDataModel {
  @Field()
  userId: string;
}
