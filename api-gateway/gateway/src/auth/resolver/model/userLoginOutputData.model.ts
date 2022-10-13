import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserLoginOutputDataModel {
  @Field()
  username: string;
  @Field()
  token: string;
}
