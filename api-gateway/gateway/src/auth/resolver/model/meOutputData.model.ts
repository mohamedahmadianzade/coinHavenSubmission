import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeOutputDataModel {
  @Field()
  userId: string;
  @Field()
  username: string;
  @Field()
  fullName: string;
  @Field()
  email: string;
}
