import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGetByIdOutputDataModel {
  @Field()
  userId: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  fullName: string;
}
