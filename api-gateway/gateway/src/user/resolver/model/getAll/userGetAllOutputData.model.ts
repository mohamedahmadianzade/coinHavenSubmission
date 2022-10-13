import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGetAllOutputDataModel {
  @Field()
  userId: string;
  @Field()
  username: string;
  @Field()
  fullName: string;
  @Field()
  email: string;
}
